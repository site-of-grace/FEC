const express = require('express');
const router = express.Router();
const axios = require('axios');
const { api, config } = require('../config.js');

//current product ids = 71697, 71698, 71699, 71700, 71701


router.get('/reviews', async (req, res) => {
	var options = {};
	options.page = req.query.page ? req.query.page : 1;
	options.sort = req.query.sort ? req.query.sort : 'relavant';
	reviewsHandler(options, (err, data) => {
		if (err) {
			res.statusCode = 404;
			res.send(JSON.stringify(err));
		} else {
			res.statusCode = 200;
			res.send(JSON.stringify(data));
		}
	});
});

//Handles api request to reviews
var reviewsHandler = (options, cb) => {
	axios.get(`${api}/reviews/?product_id=71701&count=2&sort=newest&page=${options.page}`, config)
.then((apiData) => {
	if (!apiData) {
		cb({err: 'Server request recieved no data'}, null);
		throw apiData;
	}
	if (apiData.data.results) {
		cb(null, apiData.data);
		// console.log('---review data--->', apiData.data);
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
//
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
	console.log('occured');
  axios.get(`${api}/reviews/meta/?product_id=71701`, config)
  .then((apiData) => {
    if (!apiData) {
      res.statusCode = 404;
      res.end();
      throw apiData;
    }
    if(apiData.data) {
      res.statusCode = 200;
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

module.exports = router;