const router = require("express").Router();
const { User, Workout } = require("../models");
const { ensureAuthenticated } = require("../utils/ensureAuthenticated.js");

router.get("/", async (req, res) => {
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

<<<<<<< HEAD
router.get("/workouts/:id", async (req, res) => {
  try {
    const exercise = await Workout.findByPk(req.params.id, {});
=======
router.get("/workout/:id", async (req, res) => {
  try {
    const exercise = await Workout.findByPk(req.params.id, {
      //include: [{ include: [{ model: User }] }],
    });

    console.log(exercise);
>>>>>>> 7a28e790a3969ec265a3af801a76cb7a74b06148

    if (!exercise) {
      return res.status(404).json({ msg: "Exercise not found" });
    }

    const workout = exercise.get({ plain: true });

<<<<<<< HEAD
=======
    console.log(workout);

>>>>>>> 7a28e790a3969ec265a3af801a76cb7a74b06148
    res.render("blog", {
      ...workout,
      owner: req.session.user_id === workout.user_id,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/users", ensureAuthenticated, async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const userData = await User.findAll();

    // Serialize data so the template can read it
    const stats = userData.map((blog) => blog.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("users", {
      stats,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/normal", (req, res) => {
  res.render("normal");
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
