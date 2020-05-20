const key = '57q92lPNNxT6998QwLZ39emFJoQ';
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
    if (isAuth == true) {
      res.render("profile", { auth: true });
    } else {
      res.redirect("/login");
    }
  });

router
  .post("/login", async (req, res) => {
    console.log(
      `Username: ${req.body.username}, Password: ${req.body.password}`
    );
    var user = await database.login(req.body.username, req.body.password);
    isAuth = user.isAuthenticated;
    res.send(user);
  })
  .post("/register", async (req, res) => {
    var user = await database.create(req.body.username, req.body.password);
    res.send(user);
  })
  .post("/changepfp", async (req, res) => {
    await database.changepfp(req.body.user, req.body.pfpURL);
    res.render("dashboard");
  });
module.exports = router;
