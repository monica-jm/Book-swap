const express = require("express")
const router = express.Router()
const {
  getAllBooks,
  getBooksByCategory,
  getBookById,
  createBook,
  updateBook,
  deleteBook
} = require("../controllers/book")

const { isAuth, catchErrors } = require("../middlewares")

router.get("/all", catchErrors(getAllBooks))

router.get("/category/:category", catchErrors(getBooksByCategory))

router.get("/:bookId", catchErrors(getBookById))

router.post("/", isAuth, catchErrors(createBook))

router.patch("/:bookId", isAuth, catchErrors(updateBook))

router.delete("/:bookId", isAuth, catchErrors(deleteBook))


module.exports = router