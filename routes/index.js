const express = require("express");
const router = express.Router();
//Nodemailer===========
const {
  sendEmailProcess
} = require("../controllers/nodemailer")
const { isAuth, catchErrors } = require("../middlewares")
//Books===========
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  updateBookmarks,
  deleteBook
} = require("../controllers/book")


/* GET home page */
router.get("/", (req, res, next) => {
  res.send("Bookswap API");
});

//===========Nodemailer===========
router.post('/send-email', sendEmailProcess);

//===========Books===========
router.post("/book/create", isAuth, catchErrors(createBook))

router.get("/book/all", catchErrors(getAllBooks))

router.get("/book/:bookId", catchErrors(getBookById))

router.patch("/book/update/:bookId", isAuth, catchErrors(updateBook))

router.patch("/book/:bookId/add", isAuth, catchErrors(updateBookmarks))

router.delete("/book/delete/:bookId", isAuth, catchErrors(deleteBook))

module.exports = router;

