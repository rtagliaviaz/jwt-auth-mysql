const express = require('express')
const pool = require('../database')
const jwt = require('jsonwebtoken')
const {secret} = require('../keys');
const passport = require('../lib/passport');

//initialization
const router = express.Router()

//routes
/**
 * Register
 */

router.post('/signup', (req, res, next) => {
  passport.authenticate('local.signup', {session: false}, (err, user, options) => {
    const {username, password} = req.body

    //validate if username is not empty
    if (username == '') {
      return res.json({msg: 'username cannot be empty'})
    }

    //validate if password is not empty
    if (password == '') {
      return res.json({msg: 'password cannot be empty'})
    }

    res.json({msg: options.message})
  })(req, res, next) 
})

/**
 * Login
 */

router.post('/login', (req, res, next) => {
  passport.authenticate('local.signin', {session: false}, (err, user, options) => {
    const {username, password} = req.body
    //validate if user is not empty
    if (username == '') {
      return res.json({msg: 'username cannot be empty'})
    }
    //validate if password is not empty
    if (password == '') {
      return res.json({msg: 'password cannot be empty'})
    }
    //validate if theres an user object
    if (!user) {
      return res.json({msg: 'wrong username or password'})
    }
    
    //jwt
    const payload = {
      check: true
    }

    const token = jwt.sign(payload, secret, {
      expiresIn: 1440
    })

    return res.json({msg: 'logged in', user: user, token: token})
  })(req, res, next) 
})


module.exports = router