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

const updateSection = section => {
  return sectionModel.findByIdAndUpdate(section._id, section);
};

const deleteById = sectionId => {
  return sectionModel.deleteOne({_id: sectionId});
};

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