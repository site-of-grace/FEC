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
//I'm also scared of merge conflicts and just working on functionality at the moment
//we can make things clean and efficient afterwards

app.get('/QA/:id', (req, res) => {
  let id = req.params.id;
  let config = {
    headers: {
      Authorization: `${githubToken}`
    }
  };

  axios
    .get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions?product_id=${id}`, config)
    .then((data) => {
      res.status(200).send(data.data);
    })
    .catch((error) => {
      res.status(404).send(error);
    });
});









// ===================================================


app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});

