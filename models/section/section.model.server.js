const mongoose = require('mongoose');
const sectionSchema = require('./section.schema.server');

const sectionModel = mongoose.model('SectionModel', sectionSchema);
const userModel = require('../user/user.model.server');

const createSection = section => {
  return sectionModel.create(section);
};

const findSectionsByCourseId = courseId => {
  return sectionModel.find({courseId});
};

const findById = sectionId => {
  return sectionModel.findById(sectionId);
};

const updateSection = newSection => {
  return sectionModel.findById(newSection._id)
    .then(section => {
      // update title
      section.title = newSection.title;

      // don't update freeSeats (if it has changed it only means client is out of touch with server)
      // don't update courseId (sections belong to courses it doesn't make sense to change)

      // if max enrollment has changed, update free seats
      if (newSection.maxEnrollment !== section.maxEnrollment) {
        section.freeSeats += newSection.maxEnrollment - section.maxEnrollment;
      }
      section.maxEnrollment = newSection.maxEnrollment;
      return section.save();
    });
};

const deleteById = sectionId => {
  return sectionModel.deleteOne({_id: sectionId});
};

// only way to update free seats
const enroll = (studentId, sectionId) => {
  return Promise.all([
    sectionModel.findById(sectionId),
    userModel.findUserById(studentId)
  ])
    .then(([section, student]) => {
      if (student.role !== 'STUDENT' || !section.freeSeats) {
        return null;
      }
      student.sections.push(sectionId);
      section.freeSeats = section.freeSeats - 1;
      return Promise.all([
        section.save(),
        student.save()
      ]);
    });
};

// only way to update free seats
const unenroll = (studentId, sectionId) => {
  return Promise.all([
    sectionModel.findById(sectionId),
    userModel.findUserById(studentId)
  ])
    .then(([section, student]) => {
      const enrollmentIndex = student.sections.indexOf(sectionId);
      if (student.role !== 'STUDENT' || enrollmentIndex === '1') {
        return null;
      }
      student.sections.splice(enrollmentIndex, 1);
      section.freeSeats = Math.min(section.freeSeats + 1, section.maxEnrollment);
      return Promise.all([
        section.save(),
        student.save()
      ]);
    });
};

module.exports = {
  createSection,
  findSectionsByCourseId,
  findById,
  updateSection,
  deleteById,
  enroll,
  unenroll
};