const express = require('express');
const axios = require('axios');
const { get } = require('lodash');
const router = express.Router();

router.get('/qod', async (_, res) => {
  const { data } = await axios.get('http://quotes.rest/qod');
  const quote = get(data, ['contents', 'quotes', '0', 'quote'], 'Some inspirational quote');
  res.send(quote);
});

module.exports = router;
