const key = `57q92lPNNxT6998QwLZ39emFJoQ${Math.floor(Math.random()*10000)}`;
const express = require("express");
const database = require("./database.js");

const router = express.Router();

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
    res.render("profile", { auth: true });
  });

router
  .post("/login", async (req, res) => {
    console.log(
      `Username: ${req.body.username}, Password: ${req.body.password}`
    );
    var user = await database.login(req.body.username, req.body.password, key);
    console.log(user.key);
    res.send(user);
  })
  .post("/profile", async (req, res) => {
    res.send(req.body.key == key);
    console.log(req.key);
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