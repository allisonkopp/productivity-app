const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema({
  item: {
    type: String,
    required: false
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

ListSchema.methods.addAuthor = function(authorId) {
  this.author = authorId;
  return this.save();
};

const List = mongoose.model('List', ListSchema);
module.exports = List;
