const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const CustomError = require('../errors/customError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return /[\w-]+@[\w]+\.\w+/.test(v);
      },
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new CustomError('Неправильные почта или пароль', 401));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new CustomError('Неправильные почта или пароль', 401));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
