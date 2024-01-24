const router = require("express").Router();
const userRoutes = require("./userRoutes");
const blogpostRoutes = require("./blogpostRoutes");
const commentRoutes = require("./commentRoutes");
// Route: Handle user-related routes
router.use("/users", userRoutes);
// Route: Handle blogpost-related routes
router.use("/blogpost", blogpostRoutes);
// Route: Handle comment-related routes
router.use("/comment", commentRoutes);
// Export the router for use in other parts of the application
module.exports = router;
