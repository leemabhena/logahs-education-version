
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const multer = require("multer");

const app = express();

// configure multer to accept only images
const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb("Please upload only images.", false);
    }
  };

// configure storage
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname + "/public/uploads");
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

var upload = multer({ storage: storage, fileFilter: imageFilter });

// setup ejs 
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Create connection to the database
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "logahs",
});


// home url
app.get("/", function(req, res){
    // grab all announcements from the db
    const sql = "SELECT * FROM announcements";

    db.query(sql, (err, results) => {
        if (err) {
            console.log(err);
        }else {
            res.render("index", {announce: results});
        }
    });
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

// club and sports
app.get("/clubs", (req, res) =>{
    const result = [{name:"Leo's Club", description: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut at unde quo iste`, subscription: 5}]
    res.render("clubs", {clubs:result});
})

// admin panel

// link to admin home page
app.get("/admin", function(req, res){
    // create login 
    res.render("admin");
})

// link to announcements
app.get("/admin/announcements", function(req, res){
    const sql = "SELECT * FROM announcements";
    db.query(sql, (err, results) => {
        if (err) {
            console.log(err);
        }else {
            res.render("all-announcements", {announce: results});
        }
    });
})

app.get("/admin/create-announcement", function(req, res){
    res.render("create-announcement");
})

app.post("/admin/create-announcement", function(req, res){
    // grab the form contents
    const title = req.body.title;
    const content = req.body.content;
    const sql = "INSERT INTO announcements (title, content) VALUES (?, ?)";
    db.query(sql, [title, content], (err, result)=>{
        if (err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    })
})

app.get("/admin/update-announcement/:announcement_id", function(req, res){
    const id = req.params.announcement_id;
    const sql = "SELECT * FROM announcements WHERE id=?";
    db.query(sql, id, (err, result)=>{
        if (err){
            console.log(err);
        }
        else{
            console.log(result);
            res.render("update-announcements", {announcement:result});
        }
    })
})

app.post("/admin/update-announcement/:announcement_id", function(req, res){
    const id = req.params.announcement_id;
    const title = req.body.title;
    const content = req.body.content;
    const sql = "UPDATE announcements SET title = ?, content = ? WHERE id=?";
    db.query(sql, [title, content, id], (err, result)=>{
        if (err){
            console.log(err);
        }
        else{
            // display success message if succeeded
            res.send("Updated successfully");
        }
    })
})

app.get("/admin/delete-announcement/:announcement_id", function(req, res){
    const id = req.params.announcement_id;
    const sql = "DELETE FROM announcements WHERE id=?";
    db.query(sql, id , (err, result)=>{
        if (err){
            console.log(err);
        }
        else{
            // display success message if succeeded
            res.send("Deleted successfully");
        }
    })
})

// news 

app.get("/admin/media", function(req, res){
    const sql = "SELECT * FROM news";
    db.query(sql, (err, results) => {
        if (err) {
            console.log(err);
        }else {
            res.render("all-news", {news: results});
        }
    });
})

app.get("/admin/create-news", (req, res)=>{
    res.render("create-news");
})

app.post("/admin/create-news",upload.single("newsImage"), (req, res) =>{
    const newsImage = req.file.filename;
    const title = req.body.title;
    const content = req.body.content;
    const sql = "INSERT INTO news (title, content, image) VALUES (?,?,?)";
    db.query(sql, [title, content, newsImage], (err, result)=>{
        if (err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

// start the server
app.listen(3000, function() {
    console.log("Server started on port 3000");
  });