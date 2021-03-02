const express = require("express");
const router = express.Router();
const {
  sendEmailProcess
} = require("../controllers/nodemailer")

/* GET home page */
router.get("/", (req, res, next) => {
  res.send("Bookswap API");
});

//===========Nodemailer===========
router.post('/send-email', sendEmailProcess);

module.exports = router;

