const mongoose = require('mongoose');
const submissionSchema = require('./submission.schema.server');
const answerSchema = require('./answer.schema.server');

const submissionModel = mongoose.model('SubmissionModel', submissionSchema);
const answerModel = mongoose.model('AnswerModel', answerSchema);

const submit = submission => {
  return Promise.all(submission.answers.map(answer => {
    return answerModel.create(answer);
  }))
    .then(answers => {
      submission.answers = answers.map(answer => answer._id);
      submission.submitted = Date.now();
      return submissionModel.create(submission);
    });
};

const getSubmission = sid => {
  return submissionModel.findById(sid)
    .populate('quiz')
    .populate('student')
    .populate({
      path: 'answers',
      populate: {path: 'question'}
    })
    .exec();
};

module.exports = {
  submit,
  getSubmission
};