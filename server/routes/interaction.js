const express = require('express');
const router = express.Router();
const axios = require('axios');
const { api, config } = require('../config.js');

// Receive the payload
router.post('/', async (req, res) => {
  try {
    const { element, widget, time } = req.body;
    const interactionData = {
      element,
      widget,
      time,
    };

    console.log('interactionData', interactionData);

    const { data } = await axios.post(`${api}/interactions`, interactionData, config);
    res.status(201).json(data);
  } catch (error) {
    if (error.response && error.response.status === 422) {
      res.status(422).json({ message: 'Invalid parameters' });
    } else {
      console.error(error);
      res.status(500).json({ message: 'Error forwarding request to Atelier Interactions API' });
    }
  }
});

module.exports = router;