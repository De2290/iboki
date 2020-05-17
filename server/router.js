const express = require('express');

const router = express.Router();

router.get("/", (req, res) => {
    res.render('index');
})
router.get("/login", (req, res) => {
    res.render('login');
})


router.post("/login", (req, res) => {
    console.log(`Username: ${req.body.username}, Password: ${req.body.password}`);
})
module.exports = router;