const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const GoogleStrategy = require("passport-google-oauth20").Strategy
const FacebookStrategy = require("passport-facebook").Strategy
const User = require("../models/User")
const bcrypt = require("bcryptjs")

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    (email, password, done) => {
      User.findOne({ email })
        .then(foundUser => {
          if (!foundUser) {
            done(null, false, { message: "Incorrect username" })
            return
          }

          if (!bcrypt.compareSync(password, foundUser.password)) {
            done(null, false, { message: "Incorrect password" })
            return
          }

          done(null, foundUser)
        })
        .catch(err => done(err))
    }
  )
)

//Google Strategy 
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_KEY,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK
    },
    async (_, __, profile, callback) => {
      console.log("PROFILE: ", profile)
      // Check if existing user or create user and login       
      const user = await User.findOne({ googleID: profile.id })
      if (user) {
        return callback(null, user)
      }
      const newUser = await User.create({
        googleID: profile.id,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value
      })
      return callback(null, newUser)
    }
  )
)

//Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_KEY,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK,
      profileFields: ["id", "email", "photos"]
    },
    async (_, __, profile, callback) => {
      console.log("PROFILE: ", profile)
      // Check if existing user or create user and login 
      const user = await User.findOne({ facebookID: profile.id })
      if (user) {
        return callback(null, user)
      }
      const newUser = await User.create({
        facebookID: profile.id,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value
      })
      return callback(null, newUser)
    }
  )
)

//Goodreads Strategy




