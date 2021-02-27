const express = require("express")
const router = express.Router()
const {
  signupProcess,
  loginProcess,
  logoutProcess,
  checkSession,
} = require("../controllers/auth")

const { isAuth } = require("../middlewares")

router.post("/login", loginProcess)

router.post("/signup", signupProcess)

router.get("/logout", logoutProcess)

router.get("/session", checkSession)

module.exports = router
