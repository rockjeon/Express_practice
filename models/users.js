const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  status: Number
});

module.exports = mongoose.model('user', userSchema);