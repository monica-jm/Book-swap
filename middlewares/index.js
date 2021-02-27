// Error handling 
exports.catchErrors = controller => (req, res, next) =>
  controller(req, res).catch(next)

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
