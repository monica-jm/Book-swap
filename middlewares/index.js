// Error handling 
exports.catchErrors = function (controller) {
  return function (req, res, next) {
    controller(req, res).catch(err => next(err))
  }
}

// Check if user is logged
exports.isAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" })
  }
  next()
}

// Check role
exports.isSuscriber = (req, res, next) => {
  if (!req.user.suscriber/*Check role*/) {
    return res
      .status(401)
      .json({ message: "You are not a suscriber" })
  }
  next()
}
