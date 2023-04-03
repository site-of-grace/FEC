const express = require('express');
const router = express.Router();
const axios = require('axios');
const { api, config } = require('../config.js');

router.get('/reviews', (req, res) => {
  //Gets the total review count for api request count
  var metaData = req.query.metaData;
	var reviewCount = Number(metaData.recommended.false) + Number(metaData.recommended.true);
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

router.post('/reviews', (req, res) => {
  var options = req.body;
  options.photos = ['https://www.firstbenefits.org/wp-content/uploads/2017/10/placeholder.png'];
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














//Old stuff
// router.get('/reviews', async (req, res) => {
// 	var options = {};
// 	options.page = req.query.page ? req.query.page : 1;
// 	options.sort = req.query.sort ? req.query.sort : 'relavant';
// 	reviewsHandler(options, (err, data) => {
// 		if (err) {
// 			res.statusCode = 404;
// 			res.send(JSON.stringify(err));
// 		} else {
// 			res.statusCode = 200;
// 			res.send(JSON.stringify(data));
// 		}
// 	});
// });

// //Handles api request to reviews
// var reviewsHandler = (options, cb) => {
// 	axios.get(`${api}/reviews/?product_id=71701&count=2&sort=newest&page=${options.page}`, config)
// .then((apiData) => {
// 	if (!apiData) {
// 		cb({err: 'Server request recieved no data'}, null);
// 		throw apiData;
// 	}
// 	if (apiData.data.results) {
// 		cb(null, apiData.data);
// 		// console.log('---review data--->', apiData.data);
// 	} else {
// 		console.log('No review data');
// 		cb({err: 'Server request failed no reviews fetched'}, null);
// 	}
// })
// .catch((error) => {
// 	console.log('---server error--->', error);
// 	cb(error, null);
// });
// };
//