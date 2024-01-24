const router = require("express").Router();
const { User } = require("../../models");
// Route: Register a new user
router.post("/", async (req, res) => {
  try {
    // Create a new user in the database with the provided user data
    const userData = await User.create(req.body);
    // Save the user's session information and respond with the created user data as JSON
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    // Handle errors and respond with a JSON error message
    res.status(400).json(err);
  }
});
// Route: Log in an existing user
router.post("/login", async (req, res) => {
  try {
    // Find a user with the provided username in the database
    const userData = await User.findOne({
      where: { username: req.body.username },
    });
    // Check if the user was found
    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }
    // Check if the provided password is valid
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }
    // Save the user's session information and respond with the logged-in user data as JSON
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    // Log errors, handle them, and respond with a JSON error message
    console.log(err);
    res.status(400).json(err);
  }
});
// Route: Log out the currently logged-in user
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    // Destroy the user's session and respond with a successful status
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    // Respond with a not found status if no user is currently logged in
    res.status(404).end();
  }
});
// Export the router for use in other parts of the application
module.exports = router;
