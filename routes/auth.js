const express = require("express")
const router = express.Router()
const {
  signupProcess,
  loginProcess,
  logoutProcess,
  checkSession,
  googleInit, 
  googleCallback, 
  facebookInit,
  facebookCallback 
} = require("../controllers/auth")

const { isAuth } = require("../middlewares")

router.post("/login", loginProcess)

router.post("/signup", signupProcess)

router.get("/logout", logoutProcess)

router.get("/session", checkSession)

router.get("/google", googleInit)
router.get("/google/callback", googleCallback)

router.get("/facebook", facebookInit)
router.get("/facebook/callback", facebookCallback)

module.exports = router
