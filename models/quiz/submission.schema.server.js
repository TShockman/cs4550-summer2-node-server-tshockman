const mongoose = require('mongoose');
module.exports = mongoose.Schema({
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'QuizModel'
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel'
  },
  answers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AnswerModel'
  }],
  submitted: Date
}, {collection: 'submission'});