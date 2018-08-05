const sectionModel = require('../models/section/section.model.server');

module.exports = app => {

  const createSection = (req, res) => {
    const section = req.body;
    sectionModel.createSection(section)
      .then(newSection => res.send(newSection));
  };

  const retrieveSectionsForCourse = (req, res) => {
    const courseId = req.params['courseId'];
    sectionModel.findSectionsByCourseId(courseId)
      .then(sections => res.send(sections));
  };

  const retrieveSection = (req, res) => {
    const sectionId = req.params['sectionId'];
    sectionModel.findById(sectionId)
      .then(section => res.send(section));
  };

  const updateSection = (req, res) => {
    const newSection = req.body;
    const sectionId = req.params['sectionId'];
    if (newSection._id !== sectionId) {
      return res.sendStatus(400);
    }
    sectionModel.updateSection(newSection)
      .then(section => res.send(section));
  };

  const removeSection = (req, res) => {
    const sectionId = req.params['sectionId'];
    sectionModel.deleteById(sectionId)
      .then(() => res.sendStatus(200));
  };

  app.post('/api/course/:courseId/section', createSection);
  app.get('/api/course/:courseId/section', retrieveSectionsForCourse);
  app.get('/api/section/:sectionId', retrieveSection);
  app.put('/api/section/:sectionId', updateSection);
  app.delete('/api/section/:sectionId', removeSection);
};

