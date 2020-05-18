const express = require("express");
const database = require("./database.js");

const router = express.Router();

var isAuth = false;
router
  .get("/", (req, res) => {
    res.render("index");
  })
  .get("/login", (req, res) => {
    res.render("login");
  })
  .get("/register", (req, res) => {
    res.render("register");
  })
  .get("/profile", (req, res) => {
    if (isAuth) {
      res.render("profile", { auth: true });
    } else {
      res.redirect("/register");
    }
  });

router
  .post("/login", async (req, res) => {
    console.log(
      `Username: ${req.body.username}, Password: ${req.body.password}`
    );
    var result = await database.login(req.body.username, req.body.password);
    if (result.isAuthenticated) {
      isAuth = true;
      res.redirect("/profile");
    } else {
      res.redirect("/login");
    }
    res.redirect("/login");
  })
  .post("/register", async (req, res) => {
    var err = await database.create(req.body.username, req.body.password);
    if (err == 0) {
      res.redirect("/register");
    } else {
      res.redirect("/login");
    }
  })
  .post("/changepfp", async (req, res) => {
    await database.changepfp(req.body.user, req.body.pfpURL);
    res.render("dashboard");
  });
module.exports = router;
