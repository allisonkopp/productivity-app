const express = require('express');
const router = express.Router();
const StickyNote = require('../models/sticky-note');

router.post('/create', async (req, res, next) => {
  console.log('posting', req.body);
  const { content } = req.body;
  const sitckyNoteData = { content };
  const newStickyNote = await StickyNote.create(sitckyNoteData, error => console.log(error));
  newStickyNote.addAuthor(req.session.userId);
  next();
});

router.get('/get', async (req, res) => {
  const allStickies = StickyNote.find({ author: req.session.userId });
  const parsedStickies = await allStickies.exec((err, stickies) => {
    if (err) return;
    return (stickiesArray = stickies.map(n => n._doc));
  });
  res.send(parsedStickies);
});

router.get('/delete/:id', async (req, res) => {
  await StickyNote.findById(req.params.id, (err, sticky) => {
    sticky.remove();
    res.send('/profile'); //redirect not working, had to send route to the client
  });
});

module.exports = router;
