
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const multer = require("multer");

const app = express();

// setup ejs 
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// home url
app.get("/", function(req, res){
    // grab all announcements from the db
    res.render("index");
})


// about us url
app.get("/about", function(req, res){
    res.render("about");
})

// contact us url
app.get("/contact-us", function(req, res){
    res.render("contact");
})

// contact us form handler
app.post("/contact-us", function(req, res){

})

// curriculum url
app.get("/curriculum", function(req, res){
    res.render("curriculum");
})

// enrollment url
app.get("/enrollment", function(req, res){
    res.render("enrollment");
})

// facilities url
app.get("/facilities", function(req, res){
    res.render("facilities");
})

// media url
app.get("/media", function(req, res){
 res.render("media");
})

// start the server
app.listen(process.env.PORT || 3000, function() {
    console.log("Server started on port 3000");
  });