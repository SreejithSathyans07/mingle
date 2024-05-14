const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../schemas/user-schema");
const MingleError = require("../models/error-model");
const session = require('express-session');
const Response = require('../models/response-model')

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new MingleError("user not found", 404);
    }
    const isValidCredentials = await bcrypt.compare(password, user.password);
    if(!isValidCredentials){
        throw new MingleError("Invalid email or password", 404);
    }
    req.session.user_id = user.id;
    return res.send(user);
  } catch (e) {
    next(e);
  }
});

router.post('/logout', (req, res) => {
  req.session.user_id = null;
  return res.send(new Response(true, 'Logged out successfully'));
})

router.get('/admin', (req, res) => {
  if(!req.session.user_id){
    return res.status(401).send(new Response(false, 'User unauthorized'));
  }
  return res.status(200).send(new Response(true, 'Route accessible'));
})

module.exports = router;
