const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const shortid = require('shortid');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 5,
    trim: true,
  },
  apikey: {
    type: String,
  },
  tokens: [{
    token: {
      type: String,
    }
  }]
});

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isNew) user.apikey = shortid.generate();
  if (user.isModified('password')){
    user.password = await bcrypt.hash(user.password, 8);
  }
  next()
});

userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = await jwt.sign({_id: user._id.toString()}, 'urlShortener');
  user.tokens.push({ token });
  await user.save();
  return token;
};

const userModel = mongoose.model('User', userSchema)

module.exports = userModel;

