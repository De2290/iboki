// Requires 

const express = require('express');
const pug = require('pug');
const router = require('./router.js');


// Creating the App
const app = express();
var port = process.env.PORT || 3000;


// Setting Defaults
app.set("view engine", "pug");
app.set("views", "client/views");
app.use(express.urlencoded({extended: false}));
app.use(express.static("client/resources"));


// Using Router

app.use("/", router);

// Creating the server
var server = app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})