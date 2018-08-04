const mongoose = require('mongoose');
const userSchema = require('./user.schema.server');

const userModel = mongoose.model('UserModel', userSchema);

const findAllUsers = () => {
  return userModel.find();
};

const findUserByCredentials = (username, password) => {
  return userModel.findOne({username, password});
};

const findUserById = userId => {
  return userModel.findById(userId);
};

const findUserByIdExpanded = userId => {
  return userModel
    .findById(userId)
    // .populate('sections')
    // .exec();
};

const createUser = user => {
  return userModel.create(user);
};

const deleteUserById = userId => {
  return userModel.deleteOne({_id: userId})
};

const updateUser = user => {
  return userModel.findByIdAndUpdate(user._id, user);
};

module.exports = {
  findUserByIdExpanded,
  findUserById,
  findAllUsers,
  findUserByCredentials,
  createUser,
  deleteUserById,
  updateUser
};