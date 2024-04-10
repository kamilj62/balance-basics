const express = require("express");
const { Workout, User } = require("../../models");
const router = express.Router();
const { ensureAuthenticated } = require("../../utils/ensureAuthenticated");

// router.get("/:id", async (req, res) => {
//   try {
//     const exercise = await Workout.findByPk(req.params.id, {
//       where: {
//         id: req.params.id,
//       },
//     });

//     if (!exercise) {
//       return res.status(404).json({ msg: "Workout not found" });
//     }

//     const workout = exercise.get({ plain: true });

//     console.log(workout);

//     res.render("blog", {
//       ...workout,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

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
