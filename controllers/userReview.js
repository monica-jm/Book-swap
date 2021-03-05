const userReview = require("../models/UserReview")
const Book = require("../models/Book")
const User = require("../models/User")

exports.createReview = async (req, res) => {
  const { bookId, rating, comment } = req.body

  if (typeof reviewedId !== "undefined") {
    const review = await UserReview.create({
      reviewerId: req.user._id,
      reviewedId: req.params._id,
      rating,
      comment,
    })

    const user = await User.findById(reviewedId)

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

    await User.findByIdAndUpdate(reviewedId, {
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

  } else if (typeof bookId !== "undefined") {
    const review = await UserReview.create({
      reviewerId: req.user._id,
      reviewedId: userId,
      rating,
      comment,
    })
    res.status(201).json(review)
  }
}

exports.deleteReview = async (req, res) => {
  const { reviewId } = req.params

  await Review.findByIdAndRemove(reviewId)

  res.status(200).json({
    message: "deleted"
  })
}