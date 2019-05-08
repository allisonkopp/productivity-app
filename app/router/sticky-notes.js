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

// router.post('/create', async (req, res, next) => {
//   console.log('posting', req.body);
//   const { body: { title, content } = {} } = req;
//   if (!(title && content)) return;
//   const noteData = { title, content };
//   const newNote = await Note.create(noteData, error => console.log(error)); //why won't this redirect
//   newNote.addAuthor(req.session.userId);
//   next();
// });

module.exports = router;
