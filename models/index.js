const User = require("./User");
const Workout = require("./Workout");

User.hasMany(Workout, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Workout.belongsTo(User, {
  foreignKey: "id",
  onDelete: "CASCADE",
});

module.exports = { User, Workout };
