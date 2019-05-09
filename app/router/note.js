const express = require('express');
const router = express.Router();
const Note = require('../models/note');

router.post('/create', async (req, res) => {
  console.log('posting', req.body);
  const { body: { title, content } = {} } = req;
  if (!(title && content)) return;
  const noteData = { title, content };
  const newNote = await Note.create(noteData, error => console.log(error)); //why won't this redirect
  newNote.addAuthor(req.session.userId);
  res.send('successly created a note');
});

router.post('/updateNote/:id', async (req, res, next) => {
  console.log('updating Note');
  const id = req.params.id;
  const noteData = req.body;
  try {
    const data = await Note.findByIdAndUpdate(id, noteData);
    console.log('update note success', data);
    res.send('success');
    next();
  } catch (e) {
    res.send('update note error', e);
  }
});

router.get('/getNotes', async (req, res) => {
  const allNotes = Note.find({ author: req.session.userId });
  const parsedNotes = await allNotes.exec((err, notes) => {
    if (err) return;
    return (notesArray = notes.map(n => n._doc));
  });
  res.send(parsedNotes);
});

router.get('/setNote/:id', async (req, res) => {
  Note.findById(req.params.id, (err, note) => {
    console.log('note', note);
    res.send(note);
  });
});

router.get('/deleteNote/:id', async (req, res) => {
  await Note.findById(req.params.id, (err, note) => {
    note.remove();
    res.send('/note'); //redirect not working, had to send route to the client4
  });
});

module.exports = router;
