// Import models for User, Blogpost, and Comments
const User = require("./User");
const Blogpost = require("./Blogpost");
const Comments = require("./Comments");

// Define associations between models
User.hasMany(Blogpost, { foreignKey: "user_id" });
Blogpost.belongsTo(User, { foreignKey: "user_id" });
Blogpost.hasMany(Comments, { foreignKey: "blogpost_id", onDelete: "CASCADE" });
Comments.belongsTo(Blogpost, { foreignKey: "blogpost_id" });
User.hasMany(Comments, { foreignKey: "user_id" });
Comments.belongsTo(User, { foreignKey: "user_id", as: "User" });

// Export the associated models for use in other parts of the application
module.exports = {
  User,
  Blogpost,
  Comments,
};
