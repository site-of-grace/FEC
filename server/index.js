require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
var axios = require('axios');
var githubToken = process.env.GITHUB_TOKEN;
app.use(express.static(__dirname + '/../public/dist'));
app.use(express.json());



app.get('/productStyles', (req, res) => {
  let config = {
    headers: {
      Authorization: `${githubToken}`
    }
  };
  var productId = req.query.id;
  axios
    .get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${productId}/styles`, config)
    .then((data) => {
      if (!data) {
        throw data;
      }
      res.status(200).send(data.data);
    })
    .catch((error) => {
      res.status(404).send(error);
    });
});


app.get('/initialRender', (req, res) => {
  let config = {
    headers: {
      Authorization: `${githubToken}`
    }
  };

  // shoes: 71701
  axios
    .get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/71697', config)
    .then((data) => {
      if (!data) {
        throw data;
      }
      res.status(200).send(data.data);
    })
    .catch((error) => {
      res.status(404).send(error);
    });
});



let config = {
  headers: {
    Authorization: `${githubToken}`
  }
};




//================== Api requests for reviews =================
//I know stanley planned on using the one above for everything but don't wanna cause merge conflict

app.get('/reviewsMeta', (req, res) => {
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta/?product_id=71701', config)
  .then((apiData) => {
    if (!apiData) {
      res.statusCode = 404;
      res.end();
      throw apiData;
    }
    if (apiData.data.results) {
      console.log(apiData.data.results);
    }
  });
});

app.get('/reviews', (req, res) => {
  console.log(req.query.sortOption);
  reviewsHandler(req.query.sortOption, (err, data) => {
    if (err) {
      res.statusCode = 404;
      res.send(JSON.stringify(err));
    } else {
      res.statusCode = 200;
      res.send(JSON.stringify(data));
    }
  });
});

  //current product ids = 71697, 71698, 71699, 71700, 71701
  var reviewsHandler = (sortOption, cb) => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/?product_id=71701&sort=${sortOption}`, config)
  .then((apiData) => {
    if (!apiData) {
      cb({err: 'Server request recieved no data'}, null);
      throw apiData;
    }
    if (apiData.data.results) {
      cb(null, apiData.data.results);
      //console.log('---review data--->', results);
    } else {
      console.log('No review data');
      cb({err: 'Server request failed no reviews fetched'}, null);
    }
  })
  .catch((error) => {
    console.log('---server error--->', error);
    cb(error, null);
  });
};

app.put('/reviews/helpful', (req, res) => {
  //console.log('CONFIG ====> ', config);
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/${req.body.reviewId}/helpful`, null, config)
    .then(() => {
      res.statusCode = 204;
      res.end();
    })
    .catch((error) => {
      console.log('---server error--->', error);
      res.statusCode = 404;
      res.end();
    });
});
// ===================================================



app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});

