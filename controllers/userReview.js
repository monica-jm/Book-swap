const Review = require("../models/UserRevieweview")
const Product = require("../models/Book")
const User = require("../models/User")

// Create User review
exports.createReview = async (req, res) => {
  const { reviewer, reviewed, rating, comment } = req.body

  if (typeof userId !== "undefined") {
    const review = await Review.create({
      reviewer,
      reviewed,
      rating,
      comment,
    })

    const user = await User.findById(userId)

    let {five, four, three, two, one} = user.rating

    switch (rating) {
      case 5:
        five++
        break;
      case 4:
        four++
        break;
      case 3:
        three++
        break;
      case 2:
        two++
        break;
      case 1:
        one++
        break;
    }

    const userRating = ( 5 * five + 4 * four + 3 * three + 2 * two + one) / (five + four + three + two + one)

    await User.findByIdAndUpdate(userId, {
      rating: {
          total: userRating,
          one,
          two,
          three,
          four,
          five
      },
      $push: { reviews: review._id }
    })

    res.status(201).json(review)
  } 
}

// Read User reviews
exports.getAllReviews = async (req, res) => {
  const reviews = await Review.find()
  res.status(200).json({ reviews })
}

exports.getReviewsByUser = async (req, res) => {
  const { category } = req.params

  const reviews = await Review.find({ category })
  res.status(200).json({ books })
}

exports.getReviewById = async (req, res) => {
  const { reviewId } = req.params

  const review = await Review.findById(reviewId)
    .populate("","")
  res.status(200).json(book) 
}

// Update user Reviews
exports.updateReview = async (req, res) => {
  const { reviewId } = req.params
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
