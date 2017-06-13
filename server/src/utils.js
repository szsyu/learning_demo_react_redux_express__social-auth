const jwt = require('jsonwebtoken')

const JWT_SECRET = 'twasgsergq4trergsdfg45r3fsdfgdfghsdfhg' // don't do it in production!

function createToken(id, username) {
  return jwt.sign({ id, username }, JWT_SECRET)
}

module.exports = { createToken, JWT_SECRET }
