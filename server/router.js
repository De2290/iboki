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
    res.render("profile");
  });

router
  .post("/login", (req, res) => {
    console.log(
      `Username: ${req.body.username}, Password: ${req.body.password}`
    );
    database.login(req.body.username, req.body.password);
    res.redirect("/login");
  })
  .post("/register", async (req, res) => {
    var err = await database.create(req.body.username, req.body.password);
    if (err == 0) {
      res.redirect("/register");
    } else {
      res.redirect("/login");
    }
  });
module.exports = router;
