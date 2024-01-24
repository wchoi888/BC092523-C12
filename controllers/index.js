const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");
// Route: Handle API-related routes
router.use("/api", apiRoutes);
// Route: Handle home-related routes
router.use("/", homeRoutes);
// Export the router for use in other parts of the application
module.exports = router;
