require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
var axios = require('axios');
// var githubToken = require('../githubToken.js');
var githubToken = process.env.GITHUB_TOKEN;

// app.use(bodyParser.urlencoded({ extended: false}));
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

  axios
    .get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/71701', config)
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




app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
