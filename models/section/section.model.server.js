const mongoose = require('mongoose');
const sectionSchema = require('./section.schema.server');

const sectionModel = mongoose.model('SectionModel', sectionSchema);

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

module.exports = {
  createSection,
  findSectionsByCourseId,
  findById,
  updateSection
};