const router = require("express").Router();
const { User, Workout } = require("../models");
const { ensureAuthenticated } = require("../utils/ensureAuthenticated.js");

router.get("/", ensureAuthenticated, async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const workoutData = await Workout.findAll();

    // Serialize data so the template can read it
    const workouts = workoutData.map((blog) => blog.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("homepage", {
      workouts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/workout", ensureAuthenticated, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Workout }],
    });

    const user = userData.get({ plain: true });

    console.log(user);

    res.render("workout", {
      ...user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/workout");
    return;
  }

  res.render("login");
});

module.exports = router;
