const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv");

// app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static(__dirname + '/../public/dist'));
app.use(express.json());

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});