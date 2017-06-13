const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const passport = require('passport')
const mongoose = require('mongoose')

require('dotenv').config()

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/playglound-6')

require('./passport')() // configure passport

const app = express()
app.use(cors())
app.use(morgan('tiny'))
app.use(
  session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })
)
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(passport.session())

app.use('/api', require('./router'))

app.listen(3000, () => console.log('Server started on :3000'))
