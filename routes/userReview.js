const express = require("express")
const router = express.Router()
const {
  createReview,
  deleteReview
} = require("../controllers/userReview")

const { isAuth, catchErrors } = require("../middlewares")

router.post("/", isAuth, catchErrors(createReview))

router.delete("/:reviewId", isAuth, catchErrors(deleteReview))


module.exports = router