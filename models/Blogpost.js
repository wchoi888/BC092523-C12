// Import Sequelize components for defining models and data types
const { Model, DataTypes, INTEGER } = require("sequelize");
// Import the Sequelize instance for connecting to the database
const sequelize = require("../config/connection.js");
// Import the bcrypt library for password hashing
const bcrypt = require("bcrypt");
// Define the Blogpost model by extending the Sequelize Model class
class Blogpost extends Model {
  // Method: Check if the provided password matches the hashed password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}
// Initialize the Blogpost model with defined attributes and options
Blogpost.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "user", key: "id" },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "blogpost",
  }
);

module.exports = Blogpost;
