const mongoose = require('mongoose');
module.exports = mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  role: String,
  address: String,
  email: String,
  phone: String
}, {collection: 'user'});
