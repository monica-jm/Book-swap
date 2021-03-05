const express = require("express");
const router = express.Router();
const {getUserProfile} = require('../controllers/auth')

/* GET user profile page */

router.get('/profile', getUserProfile);

module.exports = router;


const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const {getUserProfile} = require('../controllers/auth.controllers')


/* GET user profile page */

router.get('/profile', getUserProfile);

module.exports = router;