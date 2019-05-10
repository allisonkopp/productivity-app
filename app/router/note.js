const express = require('express');
const router = express.Router();
const Note = require('../models/note');

router.post('/create', (req, res) => {
  const { body: { title, content } = {} } = req;
  if (!(title && content)) return;
  const noteData = { title, content };
  const newNote = new Note(noteData);
  newNote.save((err, note) => {
    if (err) return;
    note.addAuthor(req.session.userId);
    res.send('note created!!');
  });
});

router.post('/update/:id', (req, res) => {
  const id = req.params.id;
  const noteData = req.body;
  Note.findByIdAndUpdate(id, noteData, { new: true }, (err, note) => !err && res.send(note));
});

router.get('/getAll', (req, res) => {
  const allNotes = Note.find({ author: req.session.userId });
  allNotes.exec((err, notes) => {
    if (err) return;
    const notesArray = notes.map(n => n._doc);
    return res.send(notesArray);
  });
});

router.get('/set/:id', (req, res) => {
  Note.findById(req.params.id, (err, note) => !err && res.send(note));
});

router.get('/delete/:id', (req, res) => {
  Note.findById(req.params.id, (err, note) => {
    if (err) return;
    note.remove();
    res.send('/note'); //redirect not working, had to send route to the client4
  });
});

module.exports = router;
