const express = require('express');
const router = express.Router();
const StickyNote = require('../models/sticky-note');

router.post('/stickey-note/create', async (req, res, next) => {
  console.log('posting', req.body);
  const { body: { content } = {} } = req;
  // if (!content) return;
  const stickyNoteData = { content };
  const newStickyNote = await StickyNote.create(stickyNoteData, error => console.log(error));
  newStickyNote.addAuthor(req.session.userId);
  next();
});

module.exports = router;
