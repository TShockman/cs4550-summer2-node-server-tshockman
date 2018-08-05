const mongoose = require('mongoose');
module.exports = mongoose.Schema({
  title: String,
  courseId: String,
  maxEnrollment: Number,
  freeSeats: Number
}, {collection: 'section'});
