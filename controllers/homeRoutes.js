const router = require("express").Router();
const { User, Blogpost, Comments } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    // Fetch all blogposts from the database, including associated user data
    const blogpostData = await Blogpost.findAll({
      include: [{ model: User }],
    });
    // Map the blogpost data to plain objects for rendering
    const blogposts = blogpostData.map((project) =>
      project.get({ plain: true })
    );
    // Render the homepage view with blogpost data and logged_in status
    res.render("homepage", { blogposts, logged_in: req.session.logged_in });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});
// Route: Display user's dashboard with their blogposts
router.get("/dashboard/", withAuth, async (req, res) => {
  try {
    const blogpostData = await Blogpost.findAll({
      include: [{ model: User, attributes: ["id", "username"] }],
      where: {
        user_id: req.session.user_id,
      },
    });
    // Map the blogpost data to plain objects for rendering
    const blogposts = blogpostData.map((post) => post.get({ plain: true }));
    // Render the dashboard view with user's blogpost data and logged_in status
    res.render("dashboard", {
      blogposts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// Route: Display a specific blogpost with associated comments and user data
router.get("/blogpost/:id", async (req, res) => {
  try {
    const blogpostData = await Blogpost.findByPk(req.params.id, {
      include: [
        {
          model: Comments,
          include: [{ model: User, as: "User", attributes: ["username"] }],
        },
      ],
    });
    // Convert the blogpost data to a plain object for rendering
    const blogposts = blogpostData.get({ plain: true });
    // Render the blogpost view with the specific blogpost data and logged_in status
    res.render("blogpost", {
      blogposts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// Route: Display the form for adding a new blogpost (requires authentication)
router.get("/addblogpost", withAuth, (req, res) => {
  res.render("blogpostform", { logged_in: req.session.logged_in });
});
// Route: Display the form for editing an existing blogpost (requires authentication)
router.get("/editblogpost/:id", withAuth, async (req, res) => {
  try {
    // Fetch a specific blogpost by its ID, including associated comments and user data
    const blogpostData = await Blogpost.findByPk(req.params.id, {
      include: [
        {
          model: Comments,
          include: [{ model: User, as: "User", attributes: ["username"] }],
        },
      ],
    });
    // Convert the blogpost data to a plain object for rendering
    const blogposts = blogpostData.get({ plain: true });
    // Render the blogpost form view with the specific blogpost data and logged_in status
    res.render("blogpostform", {
      blogposts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// Route: Display the signup page
router.get("/signup", (req, res) => {
  // Redirect to the homepage if the user is already logged in
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  // Render the signup view
  res.render("signup");
});
module.exports = router;
// Route: Display the login page
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    // Redirect to the homepage if the user is already logged in
    res.redirect("/");
    return;
  }
  // Render the login view
  res.render("login");
});
module.exports = router;
