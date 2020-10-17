const express = require('express');
const jwt = require('jsonwebtoken')
const {secret} = require('../keys');
const pool = require('../database');

const verify = require('./verify')
const router = express.Router()


router.post('/hola', (req, res) => {
  res.json('holas')
})


router.post('/authenticate', (req, res) => {
  if(req.body.user === 'rob' && req.body.password === '123456'){
    const payload = {
      check: true
    }
    const token = jwt.sign(payload, secret, {
      expiresIn: 1440
    })
    res.json({
      msg: 'OK',
      token: token
    })

  } else {
    res.json({ msg: 'user or password invalid'})
  }
})

router.get('/datos', verify, (req, res) => {
  const datos = [
    {id: 1, name: 'Samus'},
    {id: 2, name: 'Ryu'},
    {id:3, name: 'Dante'}
  ]

  res.json(datos)
})

router.get('/', (req, res) => {
  res.send('ok')
})



module.exports = router