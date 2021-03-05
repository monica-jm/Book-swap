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
  facebookCallback, 
  checkToken
} = require("../controllers/auth")

const { isAuth } = require("../middlewares")

router.post("/login", loginProcess)

//Route params: tag to the token so we can use it in the controller
router.get("/confirmed/:token", checkToken )

router.post("/signup", signupProcess)

router.get("/logout", logoutProcess)

router.get("/session", checkSession)

router.get("/google", googleInit)
router.get("/google/callback", googleCallback)

router.get("/facebook", facebookInit)
router.get("/facebook/callback", facebookCallback)

module.exports = router
