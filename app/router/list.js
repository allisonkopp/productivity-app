const express = require('express');
const router = express.Router();
const List = require('../models/list');

router.post('/create', async (req, res, next) => {
  const { item } = req.body;
  console.log('req.body', req.body);
  const listData = { item };
  const newList = await List.create(listData, error => console.log(error));
  newList.addAuthor(req.session.userId);
  next();
});

router.get('/getList', async (req, res) => {
  const allListItems = List.find({ author: req.session.userId });
  const parsedListItems = await allListItems.exec((err, list) => {
    if (err) return;
    return (listArray = list.map(n => n._doc));
  });
  res.send(parsedListItems);
});

module.exports = router;
