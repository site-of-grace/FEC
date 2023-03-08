require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
var axios = require('axios');
var githubToken = process.env.GITHUB_TOKEN;

app.use(express.static(__dirname + '/../public/dist'));
app.use(express.json());

app.get('/FEC', (req, res) => {
  let config = {
    headers: {
      // 'Authorization': `${githubToken.stanley}`
      Authorization: `${githubToken}`
    }
  };

  axios
    .get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/71698/styles', config)
    .then((data) => {
      if (!data) {
        throw data;
      }
      console.log('----server data--->', data);
    })
    .catch((error) => {
      console.log('----server error--->', error);
    });
});

let config = {
  headers: {
    Authorization: `${githubToken}`
  }
}


//--Api request for reviews I know stanley planned on using the one above for everything but don't wanna cause merge conflict
app.get('/reviews', (req, res) => {
  var sendError = () => {
    res.statusCode = 404;
    res.end();
  };

  //current product ids = 71697, 71698, 71699, 71700, 71701
  let config = {
    headers: {
      Authorization: `${githubToken}`
    }
  };
  //Sends 2 reviews at a time
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/?product_id=71701', config)
  .then((apiData) => {
    if (!apiData) {
      sendError();
      throw apiData;
    }
    if (apiData.data.results) {
      var results = apiData.data.results;
      console.log('---review data--->', results);
      res.statusCode = 200;
      res.send(JSON.stringify(results));
    } else {
      sendError();
    }

  })
  .catch((error) => {
    console.log('---server error--->', error);
    sendError();
  })
})

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});

