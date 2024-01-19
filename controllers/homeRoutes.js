const router = require("express").Router();
const { User, Blogpost } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const blogpostData = await Blogpost.findAll({
      include: [{ model: User }],
    });
    const blogposts = blogpostData.map((project) =>
      project.get({ plain: true })
    );
    res.render("homepage", { blogposts });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});
router.get("/dashboard/", withAuth, async (req, res) => {
  try {
    const blogpostData = await Blogpost.findAll({
      include: [{ model: User, attributes: ["id", "username"] }],
      where: {
        user_id: req.session.user_id,
      },
    });
    const blogposts = blogpostData.map((post) => post.get({ plain: true }));

    res.render("homepage", {
      blogposts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});
module.exports = router;
