const express = require('express');
const router = express.Router();
const StickyNote = require('../models/sticky-note');

router.post('/create', async (req, res) => {
  const { content } = req.body;
  const sitckyNoteData = { content };
  const newSticky = new StickyNote(sitckyNoteData);
  newSticky.save((err, sticky) => {
    if (err) return;
    sticky.addAuthor(req.session.userId);
    res.send(sticky);
  });
});

router.post('/update/:id', (req, res) => {
  const id = req.params.id;
  const stickyData = { content: req.body.content };
  StickyNote.findByIdAndUpdate(id, stickyData, { new: true }, (err, sticky) => !err && res.send(sticky));
});

router.get('/getAll', (req, res) => {
  const allStickies = StickyNote.find({ author: req.session.userId });
  allStickies.exec((err, sticky) => {
    if (err) return;
    const stickyArray = sticky.map(s => s._doc);
    res.send(stickyArray);
  });
});

router.get('/delete/:id', (req, res) => {
  StickyNote.findById(req.params.id, (err, sticky) => {
    if (err) return;
    sticky.remove();
    res.send('/profile');
  });
});

module.exports = router;
