
const express = require('express');
const User = require('../models/User');
const Router = express.Router();
const bcrypt = require('bcryptjs');


Router.post('/signup', async (req,res,next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return next('user already exists');
  }
  const newUser = new User(req.body);
  try{
      await newUser.save();
      const token = await newUser.generateAuthToken();
      res.status(201).send({ newUser, token });
  } catch(e) {
      next(e)
  }
});

Router.post('/login', async (req, res, next) => {
    try {
        console.log('req----------------', req.body, req.query, req.params);
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (user === null) {
            res.status(400).send({error: 'no user exist', msg: 'not_user'})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            throw new Error('Unable to login');
        }
        if (user !== null) {
            let token = await user.generateAuthToken();
            res.status(200).send({ user, token, msg:'user' })
        } else {
            res.status(400).send({error: 'no user exist', msg: 'not_user'})
        }
    } catch(e) {
        next(e)
    }
})

module.exports = Router;