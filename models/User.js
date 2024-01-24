// Import Sequelize components for defining models and data types
const { Model, DataTypes, INTEGER } = require("sequelize");
// Import the Sequelize instance for connecting to the database
const sequelize = require("../config/connection.js");
// Import the bcrypt library for password hashing
const bcrypt = require("bcrypt");
// Define the User model by extending the Sequelize Model class
class User extends Model {
  // Method: Check if the provided password matches the hashed password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}
// Initialize the User model with defined attributes and options
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);
// Export the User model for use in other parts of the application
module.exports = User;
