// Load environment variables from a .env file into process.env
require("dotenv").config();
// Import the Sequelize library for database interactions
const Sequelize = require("sequelize");
// Create a Sequelize instance based on the environment (JawsDB or local MySQL)
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: "localhost",
        dialect: "mysql",
        port: "3306",
        dialectOptions: {
          decimalNumbers: true,
        },
      }
    );
// Export the configured Sequelize instance for use in other parts of the application
module.exports = sequelize;
