const mongoose = require('mongoose');
const quizSchema = require('./quiz.schema.server');
const questionSchema = require('./question.schema.server');

const quizModel = mongoose.model('QuizModel', quizSchema);
const questionModel = mongoose.model('QuestionModel', questionSchema);

const getAllQuizzes = () => quizModel.find();

const getQuiz = qid => quizModel
  .findById(qid)
  .populate('questions')
  .exec();

module.exports = {
  getAllQuizzes,
  getQuiz
};