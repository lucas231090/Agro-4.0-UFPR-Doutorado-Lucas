/* eslint-disable func-names */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// const { check } = require('prettier');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
});

/*

UserSchema.methods.comparePassword = function (password, cb) {
  bcrypyt.compare(password, this.password, (err, isMatch) => {
    if (err) return cb(err);

    if (!isMatch) return cb(null, isMatch);
    return cb(null, this);
  });
};

*/

module.exports = mongoose.model('User', UserSchema);
