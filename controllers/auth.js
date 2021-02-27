const User = require("../models/User")
const passport = require("passport")
// Bcrypt to encrypt passwords
const bcrypt = require("bcryptjs")
const bcryptSalt = 10

//Delete password and other data from response to front-end
const clearRes = data => {
  const { password, __v, created_at, updated_at, ...cleanedData } = data
  return cleanedData
}

exports.loginProcess = (req, res, next) => {
  passport.authenticate("local", (error, user, errDetails) => {
    if (error) return res.status(500).json({ message: errDetails })
    if (!user) return res.status(401).json({ message: "Unauthorized" })

    req.login(user, error => {
      if (error) return res.status(500).json({ message: errDetails })
      const usr = clearRes(user.toObject())
      res.status(200).json(usr)
    })
  })(req, res, next)
}

exports.signupProcess = async (req, res) => {
  const { email, password, username } = req.body

  if (email === "" || password === "" || username === "") {
    res.status(400).json({ message: "Indicate email, username, and password" })
    return
  }

//   const usernameExits = await User.findOne({ username })
//   if (usernameExits) {
//     return res.status(401).json({ message: "The username already exists" })
//   }

  User.findOne({ email }, "email", (err, user) => {
    if (user !== null) {
      res.status(400).json({ message: "The email already exists" })
      return
    }

    const salt = bcrypt.genSaltSync(bcryptSalt)
    const hashPass = bcrypt.hashSync(password, salt)

    const newUser = new User({
      email,
      username,
      password: hashPass
    })

    newUser
      .save()
      .then(newUser => {
        const {
          _doc: { password, ...rest }
        } = newUser
        res.status(200).json(rest)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({ message: err.message })
      })
  })
}

exports.logoutProcess = (req, res) => {
  req.logout()
  res.json({ message: "loggedout" })
}

exports.checkSession = (req, res) => {
  if (req.user) {
    const usr = clearRes(req.user.toObject())
    return res.status(200).json(usr)
  }
  res.status(200).json(null)
}

//Google Auth 
exports.googleInit = passport.authenticate("google", {
  scope: [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email"
  ]
})

exports.googleCallback = (req, res, next) => {
  passport.authenticate(
    "google",
    { scope: ["profile", "email"] },
    (err, user, errDetails) => {
      if (err) return res.status(500).json({ mesage: errDetails })
      if (!user) return res.status(500).json({ message: errDetails })

      req.login(user, err => {
        if (err) return res.status(500).json({ mesage: errDetails })
        res.redirect("http://localhost:3000")
      })
    }
  )(req, res, next)
}

//Facebook Auth 
exports.facebookInit = passport.authenticate("facebook", {
  scope: ["email"]
})
exports.facebookCallback = (req, res, next) => {
  passport.authenticate(
    "facebook",
    { scope: ["email"] },
    (err, user, errDetails) => {
      if (err) return res.status(500).json({ mesage: errDetails })
      if (!user) return res.status(500).json({ message: errDetails })

      req.login(user, err => {
        if (err) return res.status(500).json({ mesage: errDetails })
        res.redirect("http://localhost:3000")
      })
    }
  )(req, res, next)
}
