const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

NoteSchema.methods.addAuthor = function(authorId) {
  this.author = authorId;
  return this.save();
};

const Note = mongoose.model('Note', NoteSchema);
module.exports = Note;
