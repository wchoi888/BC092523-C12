const { User } = require("../models");

const userData = [
  {
    username: "saliniwth",
    password: "password12345",
  },
  {
    username: "lernantino",
    password: "password12345",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
