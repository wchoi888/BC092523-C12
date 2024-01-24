// Import Sequelize components for defining models and data types
const { Model, DataTypes } = require("sequelize");
// Import the Sequelize instance for connecting to the database
const sequelize = require("../config/connection.js");
// Import the bcrypt library for password hashing
const bcrypt = require("bcrypt");
// Define the Comments model by extending the Sequelize Model class
class Comments extends Model {
  // Method: Check if the provided password matches the hashed password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}
// Initialize the Comments model with defined attributes and options
Comments.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment: { type: DataTypes.TEXT, allowNull: false },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "user", key: "id" },
    },
    blogpostId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "blogpost", key: "id" },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "comment",
  }
);

// Export the Comments model for use in other parts of the application
module.exports = Comments;
