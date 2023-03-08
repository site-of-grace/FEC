const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
var axios = require('axios');
var githubToken = require('../githubToken.js');

require("dotenv").config();



// app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static(__dirname + '/../public/dist'));
app.use(express.json());




app.get('/FEC', (req, res) => {

  let config = {
    headers: {
      'Authorization': `${githubToken.stanley}`
      }
    };


    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/71698/styles', config)
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







app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});