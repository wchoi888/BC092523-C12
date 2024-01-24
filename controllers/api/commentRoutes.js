const router = require("express").Router();
const { Comments } = require("../../models");
// Route: Create a new comment
router.post("/", async (req, res) => {
  try {
    // Create a new comment in the database with the provided data and the user's ID
    const commentsData = await Comments.create({
      ...req.body,
      userId: req.session.user_id,
    });
    // Respond with the created comment data as JSON
    res.status(200).json(commentsData);
  } catch (err) {
    // Log errors, handle them, and respond with a JSON error message
    console.log(err);
    res.status(400).json(err);
  }
});
// Export the router for use in other parts of the application
module.exports = router;
