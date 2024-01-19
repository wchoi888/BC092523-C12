// import models
const User = require("./User");
const Blogpost = require("./Blogpost");

// Products belongsTo Category
User.hasMany(Blogpost, { foreignKey: "user_id" });
Blogpost.belongsTo(User, { foreignKey: "user_id" });

module.exports = {
  User,
  Blogpost,
};
