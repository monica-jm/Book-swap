const User = require("../models/User")
const passport = require("passport")
const templates = require ("../templates/template")
// Bcrypt to encrypt passwords
const bcrypt = require("bcryptjs")
const bcryptSalt = 10
// Nodemailer 
const nodemailer = require ('nodemailer')

// Email Transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS
  }
})

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
try{
  const { email, password, username } = req.body

  if (email === "" || password === "" || username === "") {
    res.status(400).json({ message: "Indicate email, username, and password" })
    return
  }

  const usernameExits = await User.findOne({ username })
  if (usernameExits) {
    return res.status(401).json({ message: "The username already exists" })
  }

  User.findOne({ username}, (err, user) => {
    if (user !== null) {
      res.status(400).json({ message: "The name already exists" })
      return
    }

    //Hashed pasword
    const salt = bcrypt.genSaltSync(bcryptSalt)
    const hashPass = bcrypt.hashSync(password, salt)

    // Email veryfication Token
    const characters =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let token = "";
    for (let i = 0; i < 25; i++) {
    token += characters[Math.floor(Math.random() * characters.length)];
    }

    // New verified user
    const newUser = new User({
      username,
      password: hashPass,
      email,
      confirmationCode: token
      });

    // Create confirmed user
    newUser
      .save()
      .then(newUser => {
          const message = `Dear ${newUser.username}, we're really excited you've decided to join the Bookswapp community for book lovers. Please confirm your email to log in.`
          const token = newUser.confirmationCode;
          const username = newUser.username;
          
          transporter.sendMail({
          from: 'Bookswapp <bookswap.ironhack@gmail.com>',
          to: newUser.email,
          subject: "Please confirm your email",
          html: templates.templateExample(message, token, username),
        });
          const {
            _doc: { password, ...rest }
          } = newUser
          res.status(200).json({ message: 'Confirmation email sent'});
      })   
      .catch(err => {
        console.log(err)
        res.status(500).json({ message: err.message })
      })
  })
}
catch(err){
  console.log(err)
}
}

exports.checkToken = ( req, res ) =>{
  //Find a user with token from the params
  console.log(req.params)
  let {token} = req.params;
  User.findOne({confirmationCode: token})
    .then((user)=>{
      //If theres a full object...
      if(Object.keys(user).length){
        // Find the user and update status to Active
        console.log(user, "Encontré un usuario")
        User.findOneAndUpdate({confirmationCode: token}, {status: 'Active'}, {new:true})
        .then((user)=>{
          res.status(200).json({message:'User confirmed'})
        })
        .catch((errDetails)=>{
          console.log(errDetails)
          res.status(401).json({message: errDetails})
        })  
      }else{
        res.status(401).json({message: 'User not found'})
      }
    })
    .catch((err)=> {
      res.status(400).json({message: 'Could not create user', err})
    })
};

exports.logoutProcess = (req, res) => {
  req.logout()
  res.json({ message: "loggedout" })
}

exports.checkSession = async(req, res) => {
  if (req.user) {
    const usr = await (await User.findById(req.user._id).populate("bookshelf", "title author category bookCover review").populate("bookmarks", "title author category bookCover review" )) 
    return res.status(200).json(clearRes(usr.toObject()))
  }
  res.status(200).json(null)
}



exports.changeAvatar = async (req, res) => {
  const { avatar } = req.body

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $set: { avatar } },
    { new: true }
  )

  const {
    _doc: { password, ...rest }
  } = user

  res.status(200).json(rest)
}

exports.getUserProfile = (req, res) => {
  const {username, status} = req.user
  res.status(200).json({"username":req.user.username, "status":req.user.status} || {});
};

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
