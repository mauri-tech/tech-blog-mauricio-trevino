// Middleware function for authentication
const withAuth = (req, res, next) => {
    // Check if the user is logged in
    if (!req.session.loggedIn) {
      // If the user is not logged in, redirect to the login page
      res.redirect('/login');
    } else {
      // If the user is logged in, proceed with the execution of the next middleware or route handler
      next();
    }
  };
  
  module.exports = withAuth;
  