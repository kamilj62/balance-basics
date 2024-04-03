const express = require("express");
const { Workout } = require("../../models");
const router = express.Router();
const { ensureAuthenticated } = require("../../utils/ensureAuthenticated");

router.post("/", async (req, res) => {
  try {
    const newBlog = await Workout.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newBlog);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.delete("/:id", ensureAuthenticated, async (req, res) => {
  try {
    const workoutData = await Workout.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!workoutData) {
      res.status(404).json({ message: "No workout found with this id!" });
      return;
    }

    res.status(200).json(workoutData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
