const express = require('express');
const router = express.Router();
const List = require('../models/list');

router.post('/create-list', async (req, res, next) => {
  const { item } = req.body;
  const newList = await new List({ item });
  newList
    .addAuthor(req.session.userId)
    .save()
    .next();
});

module.exports = router;
