// setup an express router for related items endpoints
const express = require('express');
const router = express.Router();
const axios = require('axios');
const { calculateAverage, getThumbnailMap } = require('../utils.js');
const { initialProduct, api, config } = require('../config.js');

router.get('/', async (req, res) => {
  try {
    // const pLimit = await import('p-limit').default;
    const { default: pLimit } = await import('p-limit');
    const limit = pLimit(1);
    console.log(req.query);
    let { id, cache } = req.query;
    let currentId = id || initialProduct;

    if (cache) {
      cache = new Set(cache);
    }

    const { data } = await axios.get(`${api}/products/${currentId}/related`, config);

    const related = [];
    const products = [];
    const reviews = [];
    const styles = [];
    let result = [];
    const relatedSet = new Set();
    console.log('related data', data, cache && cache.has(data[0] + ''));
    data.forEach(productId => {
      if (cache && cache.has(productId + '')) {
        return result.push({ id: productId, cached: true});
      }

      if (relatedSet.has(productId)) {
        return;
      }

      relatedSet.add(productId);
      related.push(limit(() => axios.get(`${api}/products/${productId}/related`, config)));
      products.push(limit(() => axios.get(`${api}/products/${productId}`, config)));
      reviews.push(limit(() => axios.get(`${api}/reviews/meta/?product_id=${productId}`, config)));
      styles.push(limit(() => axios.get(`${api}/products/${productId}/styles`, config)));
    });

    const relatedData = await Promise.all(related);
    const productData = await Promise.all(products);
    const reviewData = await Promise.all(reviews);
    const styleData = await Promise.all(styles);

    const fetched = productData.map((product, i) => ({
      ...product.data,
      rating: calculateAverage(reviewData[i].data),
      styles: styleData[i].data.results,
      validPhotos: getThumbnailMap(styleData[i].data.results),
      related: relatedData[i].data,
      mainProduct: currentId,
    }));

    result = [...result, ...fetched];
    console.log('related result', result.length);
    res.status(200).send(result);
  } catch (err) {
    console.error('Error in /related');
    res.status(500).send({ error: 'Internal server error in /related' });
  }
});

module.exports = router;
