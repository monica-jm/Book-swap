const express = require("express");
const router = express.Router();
//Nodemailer===========
// const {
//   sendEmailProcess
// } = require("../controllers/nodemailer")
const { isAuth, catchErrors } = require("../middlewares")
//Books===========
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  updateBookmarks,
  deleteBook
} = require("../controllers/book");
const UserReview = require("../models/UserReview");

/* GET home page */
router.get("/", (req, res, next) => {
  res.send("Bookswap API");
});

//===========Nodemailer===========
// router.post('/send-email', catchErrors(sendEmailProcess));;

//===========Books===========
router.post("/book/create", isAuth, catchErrors(createBook));

router.get("/book/all", catchErrors(getAllBooks));

router.get("/book/:bookId", catchErrors(getBookById));

router.patch("/book/update/:bookId", isAuth, catchErrors(updateBook));

router.patch("/book/add/:bookId/", isAuth, catchErrors(updateBookmarks));

router.delete("/book/delete/:bookId", isAuth, catchErrors(deleteBook));

//===========User Review===========
router.patch("/review/:reviewedId", isAuth, catchErrors(UserReview));

//===========Suscription===========
router.post("/suscribe", isAuth, catchErrors(UserReview));
router.post("/jg", isAuth, catchErrors(UserReview))

module.exports = router;

