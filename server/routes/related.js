// setup an express router for related items endpoints
const express = require('express');
const router = express.Router();
const axios = require('axios');
const { calculateAverage } = require('../utils.js');
const { initialProduct, api, config } = require('../config.js');

router.get('/', async (req, res) => {
  try {
    // console.log(req.query);
    let { arg, id } = req.query;
    let cache;
    let currentId = id || (arg && arg.id);
    if (!currentId) {
      currentId = initialProduct;
      // return;
    }

    if (arg && arg.cache) {
      cache = new Set(arg.cache);
    }

    const { data } = await axios.get(`${api}/products/${currentId}/related`, config);

    const related = [];
    const products = [];
    const reviews = [];
    const styles = [];
    data.forEach(productId => {
      if (cache && cache.has(productId)) {
        return;
      }
      related.push(axios.get(`${api}/products/${productId}/related`, config));
      products.push(axios.get(`${api}/products/${productId}`, config));
      reviews.push(axios.get(`${api}/reviews/meta/?product_id=${productId}`, config));
      styles.push(axios.get(`${api}/products/${productId}/styles`, config));
    });

    const relatedData = await Promise.all(related);
    const productData = await Promise.all(products);
    const reviewData = await Promise.all(reviews);
    const styleData = await Promise.all(styles);

    const result = productData.map((product, i) => ({
      ...product.data,
      rating: calculateAverage(reviewData[i].data),
      styles: styleData[i].data.results,
      related: relatedData[i].data,
    }));

    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Internal server error in /related' });
  }
});

module.exports = router;
