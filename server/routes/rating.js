const express = require('express');
const router = express.Router();
const axios = require('axios');
const { api, config } = require('../config.js');

const multer = require('multer');
const upload = multer({dest: 'uploads/'});

router.get('/reviews', (req, res) => {
  //Gets the total review count for api request count
  var metaData = req.query.metaData;
  var recommended = metaData.recommended;
  var reviewCount = 0;
		if (recommended.false && recommended.true) {
			reviewCount = Number(recommended.false) + Number(recommended.true);
		} else if (recommended.false) {
				reviewCount = Number(recommended.false);
		} else {
				reviewCount = Number(recommended.true);
		}
	axios.get(`${api}/reviews/?product_id=${req.query.product_id}&count=${reviewCount}&sort=newest`, config)
  .then((reviewData) => {
    if (!reviewData.data || !reviewData.data.results) {
      req.statusCode = 404;
      res.end();
    }
    req.statusCode = 200;
    res.send(JSON.stringify(reviewData.data));
  })
  .catch((error) => {
    console.log('---server error--->', error);
    res.statusCode = 404;
    res.end();
  });
});

//Increments helpful for review
router.put('/helpful', (req, res) => {
  axios.put(`${api}/reviews/${req.body.reviewId}/helpful`, null, config)
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

//Sends metadata
router.get('/meta', (req, res) => {
  axios.get(`${api}/reviews/meta/?product_id=${req.query.product_id}`, config)
  .then((apiData) => {
    if (!apiData) {
      res.statusCode = 404;
      res.end();
      throw apiData;
    }
    if(apiData.data) {
      res.statusCode = 201;
      res.send(JSON.stringify(apiData.data));
    } else {
      res.statusCode = 404;
      res.end();
    }
  })
  .catch((err) => {
    console.log('Server err --->', err);
    res.statusCode = 404;
    res.send(JSON.stringify(err));
  });
});

router.post('/images', upload.single('image'),(req, res) => {
  console.log(req.file);
  if (req.file) {
    res.statusCode = 201;
    res.end();
  }
});

router.post('/reviews', (req, res) => {
  console.log(req.body);
  var options = req.body;
  axios.post(`${api}/reviews`, options, config)
  .then(() => {
    res.statusCode = 200;
    res.end();
  })
  .catch((err) => {
    console.log('Server err --->', err);
    res.statusCode = 404;
    res.send(JSON.stringify(err));
  });
});
module.exports = router;














