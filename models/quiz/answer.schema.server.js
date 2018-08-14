const mongoose = require('mongoose');
module.exports = mongoose.Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'QuestionModel'
  },
  tfAnswer: Boolean,
  mcAnswer: String,
  essayAnswer: String,
  fitbAnswers: [String]
}, {collection: 'answer'});