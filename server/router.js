const express = require('express');
const database = require('./database.js');

const router = express.Router();

router
.get("/", (req, res) => {
    res.render('index');
})
.get("/login", (req, res) => {
    res.render('login');
})
.get("/register", (req, res) => {
    res.render('register');
})

router.post("/login", (req, res) => {
    console.log(`Username: ${req.body.username}, Password: ${req.body.password}`);
    database.login(req.body.username, req.body.password);
    res.redirect("/login");
}).post("/register", (req, res) => {
    database.create(req.body.username, req.body.password);
    res.redirect("/login");
})
module.exports = router;