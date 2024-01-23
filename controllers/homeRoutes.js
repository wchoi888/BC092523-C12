const router = require("express").Router();
const { User, Blogpost, Comments } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const blogpostData = await Blogpost.findAll({
      include: [{ model: User }],
    });
    const blogposts = blogpostData.map((project) =>
      project.get({ plain: true })
    );
    res.render("homepage", { blogposts, logged_in: req.session.logged_in });
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

    res.render("dashboard", {
      blogposts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
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
    const blogposts = blogpostData.get({ plain: true });
    //console.log(blogpost);
    res.render("blogpost", {
      blogposts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/addblogpost", withAuth, (req, res) => {
  res.render("blogpostform", { logged_in: req.session.logged_in });
});
router.get("/editblogpost/:id", withAuth, async (req, res) => {
  try {
    const blogpostData = await Blogpost.findByPk(req.params.id, {
      include: [
        {
          model: Comments,
          include: [{ model: User, as: "User", attributes: ["username"] }],
        },
      ],
    });
    const blogposts = blogpostData.get({ plain: true });
    res.render("blogpostform", {
      blogposts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});
module.exports = router;
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});
module.exports = router;
