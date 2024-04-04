const ensureAuthenticated = (req, res, next) => {
  console.log("req.session", req.session);
  if (req.session.user_id) {
    console.log("userAuthenticated");
    // User is authenticated, proceed to the next middleware or route handler
    next();
  } else {
    console.log("redirect");
    // User is not authenticated, redirect to the login page or send an error response
    //res.status(401).json({ message: 'Unauthorized. Please log in.' });
    res.redirect("/login");
  }
};

module.exports = {
  ensureAuthenticated,
};
