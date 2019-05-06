const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StickyNoteSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

StickyNoteSchema.methods.addAuthor = function(authorId) {
  this.author = authorId;
  return this.save();
};

const StickyNote = mongoose.model('StickyNote', StickyNoteSchema);
module.exports = StickyNote;
