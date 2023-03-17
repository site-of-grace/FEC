require('dotenv').config();
const axios = require('axios');
const express = require('express');
const routes = require('./routes');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const { api, initialProduct, config } = require('./config.js');

app.use(express.static(__dirname + '/../public/dist'));
app.use(express.json());

// Routes
app.use('/related', routes.related);

app.get('/productStyles', (req, res) => {
  var productId = req.query.id;
  axios
    .get(`${api}/products/${productId}/styles`, config)
    .then((data) => {
      if (!data) {
        throw data;
      }
      res.status(200).send(data.data); // [stanleysdata, danielsdata]
    })
    .catch((error) => {
      res.status(404).send(error);
    });
  });



  app.post('/cart', (req, res) => {
    console.log(req.body);

    axios
      .post(`${api}/cart`, req.body, config)
      .then((data) => {
        if (!data) {
          throw data;
        }

          axios.get(`${api}/cart`, config)
            .then((data) => {
              if (!data) {
                throw data;
              }
              console.log('CART DATA', data.data);
            })
            .catch((error) => {
              console.log('ERROR in get', error);
            })


      })
      .catch((error) => {
        console.log('ERRORRRR');
      });

  });



  app.get('/initialRender', (req, res) => {
  // shoes: 71701
  axios
    .get(`${api}/products/${initialProduct}`, config)
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


//================== Api requests for reviews =================
//I know stanley planned on using the one above for everything but don't wanna cause merge conflict

app.get('/reviews', (req, res) => {
  var sendError = () => {
    res.statusCode = 404;
    res.end();
  };

  //current product ids = 71697, 71698, 71699, 71700, 71701
  //Sends 2 reviews at a time
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/?product_id=71701', config)
  .then((apiData) => {
    if (!apiData) {
      sendError();
      throw apiData;
    }
    if (apiData.data.results) {
      var results = apiData.data.results;
      //console.log('---review data--->', results);
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

app.put('/reviews/helpful', (req, res) => {
  console.log('CONFIG ====> ', config);
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/${req.body.reviewId}/helpful`, null, config)
    .then(() => {
      res.statusCode = 204;
      res.end();
    })
    .catch((error) => {
      console.log('---server error--->', error);
      res.statusCode = 404;
      res.end();
    })
});
// ===================================================



app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});

