/****************************************************************************** 
* ITE5315 – Assignment 2 
* I declare that this assignment is my own work in accordance with Humber Academic Policy. 
* No part of this assignment has been copied manually or electronically from any other source 
* (including web sites) or distributed to other students.  
* Name: Deep Manish Lad Student ID: n01582108 Date: 05-03-2024
******************************************************************************/
var express = require("express");
var path = require("path");
var app = express();

const fs = require("fs");
const exphbs = require("express-handlebars");
const port = process.env.port || 3000;
app.use(express.urlencoded({ extended: true }));
// configuring handlebars
app.use(express.static(path.join(__dirname, "public")));
app.engine("hbs", exphbs.engine({
   extname: ".hbs",
   defaultLayout: "main",
   helpers: {
      replace:function(avg_review){
        return avg_review === "" ? "N/A" :avg_review;
      }
   }
   }));
app.set("view engine", "hbs");

var myData = fs.readFileSync("datasetA.json");
myData = JSON.parse(myData);

// default route
app.get("/", function (req, res) {
  res.render("index", { title: "Express" });
});

// route for users
app.get("/users", function (req, res) {
  res.send("respond with a resource");
});

// route to get all books
app.get("/data",function(req,res){
  res.render("books.hbs",{
    data:myData,
    layout:false
  })
})

// route to get a book based on isbn
app.get("/data/isbn/:index(\\d+)",function(req,res){
  res.render("book.hbs",{
    data:myData[req.params.index]
  })
})

app.get("/data/search",function(req,res){
    res.render("search.hbs")
})

// route to get a book based on title
app.post("/data/search",function(req,res){
  var title = req.body.txtTitle.toLowerCase();
  var temp = null;
  for(var i =0; i<myData.length; i++){
    if(myData[i].title.toLowerCase().includes(title)){
      temp = myData[i];
      break;
    }
  }
  res.render('search.hbs',{
    data:temp
  })
})

app.get("/allData",function(req,res){
  res.render("books.hbs",{
    data:myData,
    layout:false
  })
})
// route other than mentioned above
app.get("*", function (req, res) {
  res.render("error", { title: "Error", message: "Wrong Route" });
});

// assigning port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
