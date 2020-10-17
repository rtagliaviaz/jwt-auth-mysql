const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database')

/**
 * local sign in
 */

 passport.use('local.signin', new LocalStrategy({
   usernameField: 'username',
   passwordField: 'password',
   passReqToCallback: true
 }, async(req, username, password, done) => {
    const user = await pool.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password])
    if (user.length > 0) {
      console.log(user)
      return done(null, user, {message: 'success'})
    } 
      return done(null, false, {message: 'username not found in database'})
 }))

/**
 * Local Sign Up
 */

passport.use('local.signup', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {

  const user = await pool.query('SELECT * FROM users WHERE username = ?', [username])

  //validate user is not duplicate
  if (user.length > 0) {
    console.log(username)
    return done(null, false, { message: 'username already registered'})
  }

  const newUser = {
    username,
    password
  }

  const result = await pool.query('INSERT INTO users SET ?', [newUser]);
  // console.log(result)
  newUser.id = result.insertId;
  return done(null, newUser, {message: 'user registered successfully'});
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id])
  done(null, rows[0])
})

 module.exports = passport