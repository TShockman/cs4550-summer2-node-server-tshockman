const userModel = require('../models/user/user.model.server');
const sectionModel = require('../models/section/section.model.server');


module.exports = app => {

  const enrollStudent = (req, res) => {
    const {studentId, sectionId} = req.params;
    sectionModel.enroll(studentId, sectionId)
      .then(result => {
        if (result) {
          res.sendStatus(200);
        } else {
          res.sendStatus(400);
        }
      });
  };

  const getAllSectionsForStudent = (req, res) => {
    const studentId = req.params['studentId'];
    userModel.findUserByIdExpanded(studentId)
      .then(student => {
        res.send(student.sections);
      });
  };

  const unenrollStudent = (req, res) => {
    const {studentId, sectionId} = req.params;
    sectionModel.unenroll(studentId, sectionId)
      .then(result => {
        if (result) {
          res.sendStatus(200);
        } else {
          res.sendStatus(400);
        }
      });
  };

  app.post('/api/student/:studentId/section/:sectionId', enrollStudent);
  app.get('/api/student/:studentId/section', getAllSectionsForStudent);
  app.delete('/api/student/:studentId/section/:sectionId', unenrollStudent);
};