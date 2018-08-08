const mongoose = require('mongoose');
const userSchema = require('./user.schema.server');
const bcrypt = require('bcrypt');

const userModel = mongoose.model('UserModel', userSchema);

const findAllUsers = () => {
  return userModel.find();
};

const findUserByCredentials = (username, password) => {
  console.log('finding user by credentials')
  return userModel.findOne({username})
    .then(user => {
      console.log('found user', user);
      if (user && bcrypt.compareSync(password, user.password)) {
        return user;
      }
      return null;
    });
};

const findUserById = userId => {
  return userModel.findById(userId);
};

const findUserByIdExpanded = userId => {
  return userModel
    .findById(userId)
    .populate('sections')
    .exec();
};

const createUser = user => {
  return userModel.findOne({username: user.username})
    .then(result => {
      if (result) {
        return null;
      }
      user.password = bcrypt.hashSync(user.password, 10);
      return userModel.create(user);
    });
};

const deleteUserById = userId => {
  return userModel.deleteOne({_id: userId})
};

const updateUser = user => {
  return userModel.findById(user._id)
    .then(dbUser => {
      delete user.password;
      Object.assign(dbUser, user);
      return dbUser.save();
    });
};

const updatePassword = user => {
  return userModel.findById(user._id)
    .then(dbUser => {
      const hash = bcrypt.hashSync(user.password, 10);
      dbUser.password = hash;
      return dbUser.save();
    });
};

module.exports = {
  findUserByIdExpanded,
  findUserById,
  findAllUsers,
  findUserByCredentials,
  createUser,
  deleteUserById,
  updateUser,
  updatePassword
};