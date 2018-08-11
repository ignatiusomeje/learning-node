const mongoose = require('mongoose')

const User = mongoose.model('User', {
  Email: {
    type: String,
    required: true,
    trim: true,
    minLength: 1
  }
});

module.exports = {
  User
}