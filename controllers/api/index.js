const router = require("express").Router();
const userRoutes = require("./userRoutes");
const workoutRoutes = require("./workoutRoutes");

router.use("/workouts", workoutRoutes);
router.use("/users", userRoutes);
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
