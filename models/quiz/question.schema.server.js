const mongoose = require('mongoose');
module.exports = mongoose.Schema({
  title: String,
  points: Number,
  description: String,
  choices: [{
    text: String,
    correct: Boolean
  }],
  blanks: [String],
  isTrue: Boolean,
  questionType: {
    type: String,
    enum: [
      'ESSAY',
      'FILL_BLANKS',
      'TRUE_FALSE',
      'CHOICE'
    ]
  }
}, {collection: 'question'});