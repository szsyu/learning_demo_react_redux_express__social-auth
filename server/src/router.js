const express = require('express')
const passport = require('passport')
const utils = require('./utils')
const { User } = require('./models')

const router = express.Router()

async function handleLogin(req, res, next) {
  passport.authenticate('local-login', (err, user) => {
    if (err) return next(err)
    if (!user)
      return res
        .status(401)
        .json({ error: 'Username or password is incorrect.' })

    return res.json({ token: utils.createToken(user.id, user.username) })
  })(req, res, next)
}

async function handleSignup(req, res) {
  const { username, password } = req.body
  if (!username || !password)
    return res
      .status(422)
      .json({ error: 'Username or password is not specified.' })

  const user = await User.findOne({ username })
  if (user) return res.status(422).json({ error: 'Username is taken.' })

  const newUser = new User({ username, password })
  await newUser.save()

  return res
    .status(201)
    .json({ token: utils.createToken(newUser.id, username) })
}

function handleSecret(req, res) {
  res.json({ secret: 'Mega Secret', user: req.user })
}

function handleTwitterCallback(req, res) {
  const token = utils.createToken(req.user.id, req.user.username)
  res.redirect(`${process.env.TOKER_RETURN_URL}?token=${token}`)
}

const requireJwt = passport.authenticate('jwt', { session: false })

router.get('/secret', requireJwt, handleSecret)
router.post('/signup', handleSignup)
router.post('/login', handleLogin)
router.get('/auth/twitter', passport.authenticate('twitter'))
router.get(
  '/auth/twitter/callback',
  passport.authenticate('twitter'),
  handleTwitterCallback
)

module.exports = router
