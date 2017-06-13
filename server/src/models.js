const mongoose = require('mongoose')

const twitter = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
})

const schema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // use bcryptjs in production!
  twitter,
})

const User = mongoose.model('User', schema)

module.exports = { User }
