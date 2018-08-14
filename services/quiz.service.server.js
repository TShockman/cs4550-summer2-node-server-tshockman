const quizModel = require('../models/quiz/quiz.model.server');

module.exports = app => {

  const getAllQuizzes = (req, res) => {
    quizModel.getAllQuizzes()
      .then(quizzes => res.send(quizzes));
  };

  const getQuiz = (req, res) => {
    const qid = req.params['qid'];
    quizModel.getQuiz(qid)
      .then(quiz => res.send(quiz));
  };

  app.get('/api/quiz', getAllQuizzes);
  app.get('/api/quiz/:qid', getQuiz);
};