const express = require("express");
const router = express.Router();
const {getUserProfile} = require('../controllers/auth')

/* GET user profile page */

router.get('/profile', getUserProfile);

module.exports = router;
