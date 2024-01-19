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
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});
module.exports = router;
