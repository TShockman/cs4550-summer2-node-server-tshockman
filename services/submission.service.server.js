const submissionModel = require('../models/quiz/submission.model.server');

module.exports = app => {

  const submit = (req, res) => {
    const currentUser = req.session['currentUser'];
    const qid = req.params['qid'];
    const submission = req.body;
    submission.quiz = qid;
    submission.student = currentUser._id;
    if (currentUser && currentUser.role === 'STUDENT' && qid) {
      submissionModel.submit(submission)
        .then(newSubmission => res.send(newSubmission));
    } else {
      req.sendStatus(400);
    }
  };

  const getAllSubmissionsForQuiz = (req, res) => {
    const qid = req.params['qid'];
    submissionModel.getAllSubmissionsForQuiz(qid)
      .then(submissions => res.send(submissions));
  };

  const getSubmission = (req, res) => {
    const sid = req.params['sid'];
    submissionModel.getSubmission(sid)
      .then(submission => res.send(submission));
  };

  app.post('/api/quiz/:qid/submission', submit);
  app.get('/api/quiz/:qid/submission', getAllSubmissionsForQuiz);
  app.get('/api/quiz/:qid/submission/:sid', getSubmission);
};