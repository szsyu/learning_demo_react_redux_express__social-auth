const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const TwitterStrategy = require('passport-twitter').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const models = require('./models')
const utils = require('./utils')

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    models.User.findById(id, (err, user) => done(err, user))
  })

  // local
  passport.use(
    'local-login',
    new LocalStrategy(
      { usernameField: 'username' },
      async (username, password, done) => {
        try {
          const user = await models.User.findOne({ username, password })
          if (!user) return done(null, false)
          return done(null, user)
        } catch (err) {
          console.error(err)
          return done(err)
        }
      }
    )
  )

  // JWT
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: utils.JWT_SECRET,
  }
  passport.use(
    'jwt',
    new JwtStrategy(jwtOptions, (payload, done) => {
      models.User.findById(payload.id, (err, data) => {
        if (err) return done(err, false)
        if (data) return done(null, data)
        return done(null, false)
      })
    })
  )

  // Twitter
  const twitterOptios = {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: process.env.TWITTER_CALLBACL_URL,
  }
  passport.use(
    'twitter',
    new TwitterStrategy(
      twitterOptios,
      async (token, tokenSecret, profile, cb) => {
        console.log('profile', profile)
        try {
          const user = await models.User.findOne({ 'twitter.id': profile.id })
          if (user) return cb(null, user)

          // don't do it in production!!!
          const newUser = new models.User({
            username: profile.username,
            password: '*********',
            twitter: {
              id: profile.id,
              username: profile.username,
              displayName: profile.displayName,
            },
          })
          await newUser.save()
          return cb(null, newUser)
        } catch (err) {
          console.error(err)
          return cb(err)
        }
      }
    )
  )
}
