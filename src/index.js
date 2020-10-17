const express = require('express');
const jwt = require('jsonwebtoken')
const {database, secret} = require('./keys');
const passport = require('passport');
const cors = require('cors');

//initializations
const app = express()

//settings
app.set('port', process.env.PORT || 4000);

//middlewares
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
app.use(passport.initialize());

//routes
app.use(require('./routes/index'))
app.use(require('./routes/auth'))
app.use(require('./routes/movies'))

//start server
app.listen(app.get('port'), () => {
  console.log(`App listening on port ${app.get('port')}!`);
});


