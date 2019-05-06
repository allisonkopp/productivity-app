const express = require('express');
const router = express.Router();
const StickyNote = require('../models/sticky-note');

router.post('/create-sticky', async (req, res, next) => {
  console.log('posting', req.body);
  const { content } = req.body;
  const newStickyNote = await new StickyNote({ content });
  newStickyNote
    .addAuthor(req.session.userId)
    .save()
    .next();

  // .try(error => console.log(error))
});

module.exports = router;
