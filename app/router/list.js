const express = require('express');
const router = express.Router();
const List = require('../models/list');

router.post('/create', async (req, res) => {
  const { item } = req.body;
  const listData = { item };
  const newList = new List(listData);
  newList.save((err, list) => {
    if (err) return;
    list.addAuthor(req.session.userId);
    res.send(list);
  });
});

router.post('/update/:id', (req, res) => {
  const id = req.params.id;
  const listData = { item: req.body.item };
  List.findByIdAndUpdate(id, listData, { new: true }, (err, list) => !err && res.send(list));
});

router.get('/getAll', (req, res) => {
  const allListItems = List.find({ author: req.session.userId });
  allListItems.exec((err, list) => {
    if (err) return;
    const listArray = list.map(l => l._doc);
    res.send(listArray);
  });
});

router.get('/delete/:id', (req, res) => {
  List.findById(req.params.id, (err, list) => {
    if (err) return;
    list.remove();
    res.send('/profile');
  });
});

module.exports = router;
