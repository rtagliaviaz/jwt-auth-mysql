const express = require('express');
const jwt = require('jsonwebtoken')
const {secret} = require('../keys');
const verify = express.Router()

//middleware to verify token
verify.use((req, res, next) => {
  const token = req.headers['access-token']

  if (token) {
    jwt.verify(token, secret, (err, decode) => {
      if (err) {
        return res.json({ msg: 'Invalid Token'})
      } else {
        req.decoded = decode;
        // console.log(req.decoded)
        next()
      }
    })
  } else {
    res.json({ msg: 'No Token'})
  }
})

module.exports = verify