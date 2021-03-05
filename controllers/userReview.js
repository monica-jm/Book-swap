const Review = require("../models/UserReview")
const Product = require("../models/Book")
const User = require("../models/User")

// Create User review
exports.createReview = async (req, res) => {

}

// Read User reviews

exports.getReviewById = async (req, res) => {
  const { reviewId } = req.params

  const review = await Review.findById(reviewId)
    .populate("","")
  res.status(200).json(book) 
}

// Update user Reviews
exports.updateReview = async (req, res) => {
  const { userId } = req.params
  const { reviewer, reviewed, rating, comment  } = req.body

  const review = await Review.findById(reviewId)

  if (review.owner.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  const reviewNew = await Review.findByIdAndUpdate(
    reviewId,
    { reviewer, reviewed, rating, comment  },
    { new: true }
  )

  res.status(200).json(reviewNew)
}


// Delete User review
exports.deleteReview = async (req, res) => {
  const { userReviewId } = req.params

  await userReview.findByIdAndRemove(userReviewId)

  res.status(200).json({
    message: "Review deleted"
  })
}
