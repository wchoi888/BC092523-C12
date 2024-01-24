// Middleware: Check if user is authenticated (logged in)
const withAuth = (req, res, next) => {
  // Redirect to login page if user is not logged in, otherwise, proceed to the next middleware or route
  if (!req.session.logged_in) {
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports = withAuth;
