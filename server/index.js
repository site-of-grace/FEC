require('dotenv').config();
const axios = require('axios');
const express = require('express');
const routes = require('./routes');
const app = express();
const port = process.env.PORT || 3000;
const { api, initialProduct, config } = require('./config.js');
app.use(express.static(__dirname + '/../public/dist'));
app.use(express.json());

// Routes
app.use('/related', routes.related);
app.use('/rating', routes.rating);

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
            });


      })
      .catch((error) => {
        console.log('ERRORRRR', error);
      });

  });

//

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





// ============API requests for Q&A=======================================

app.get('/questions', (req, res) => {

  var product_id = req.query.product_id;
  console.log('req.query====> ',req.query);
  // console.log('productId in /QA/questions==========> ', product_id);
  axios
    .get(`${api}/qa/questions/?product_id=${product_id}`, config)
    .then((data) => {
      if (!data) {
        throw data;
      }      
      // console.log('OK request on questions route, data.data: ', data.data);
      res.send(data.data);
    })
    .catch((error) => {
      // console.log('error on questions route ', error);
      res.send(error);
    });
  });

  
  app.put('/answer/helpful/:answer_id', (req, res) => {
    var answer_id = req.params.answer_id;
    console.log('answer_id====> ', answer_id);
    // console.log('req.params====> ', req.params);
    // console.log('productId in /QA/questions==========> ', product_id);
    axios
      .put(`${api}/qa/answers/${answer_id}/helpful`, null, config)
      .then((data) => {
        res.sendStatus(204);
        // console.log('data==========> ', data);
        console.log('GOOD HELPFUL REQUEST');
      })
      .catch((error) => {
        console.log('error on questions helpful route ', error);
        res.send(error);
      });
    });
    
    
  
  
  
  
  
  
// ===================================================


app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});

