// setup an express router for related items endpoints
const express = require('express');
const router = express.Router();
const axios = require('axios');
const { api, config } = require('../config.js');

router.get('/', async (req, res) => {
  try {
    const currentId = req.query.id;
    console.log(req.query);

    if (!currentId) {
      res.status(400).send({ error: 'Missing id in /related' });
      return;
    }

    const { data } = await axios.get(`${api}/products/${currentId}/related`, config);

    const related = [];
    const products = [];
    data.forEach(productId => {
      related.push(axios.get(`${api}/products/${productId}/related`, config));
      products.push(axios.get(`${api}/products/${productId}`, config));
    });

    const relatedData = await Promise.all(related);
    const productData = await Promise.all(products);

    const result = productData.map((product, i) => ({
      ...product.data,
      related: relatedData[i].data
    }));

    res.status(200).send(result);
  } catch (err) {
    // console.error(err);
    res.status(500).send({ error: 'Internal server error in /related' });
  }
});

module.exports = router;
