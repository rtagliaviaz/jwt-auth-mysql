const express = require('express');
const pool = require('../database')

const verify = require('./verify')

const router = express.Router()

router.get('/movies', verify, async(req, res) => {
  const id = req.headers['authorization']
  // console.log(req.headers['authorization'])
  const movies = await pool.query('SELECT * FROM movies WHERE user_id = ?', [id])
  res.json({movies: movies})
});

router.post('/movies', async(req, res) => {
  const {title, category, user_id} = req.body
  if (user_id == undefined || user_id == null) {
    return res.json({msg: 'unauthorized'})
  }
  if (title == '') {
    return res.json({msg: 'title cannot be empty'})
  }

  const newMovie = {
    title,
    category,
    user_id
  }
  await pool.query('INSERT INTO movies SET ?', [newMovie])
  res.json({msg: 'Movie added successfully'})
})

router.get('/movies/delete/:id', async (req, res) => {
  const {id} = req.params
  await pool.query('DELETE FROM movies WHERE id = ?', [id])
  res.json({msg: 'deleted'})
});

module.exports = router