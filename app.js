const express = require('express');
const bodyParser = require('body-parser');
var app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/todo");

const trySchema = new mongoose.Schema({
    name:String
});

const item = mongoose.model("task", trySchema);
const todo = new item({
    name : "Create some videos"
});
//todo.save();
const todo2 = new item({
    name : "Learn DSA"
});
//todo2.save();
const todo3 = new item({
    name : "Learn React"
});
//todo3.save();
const todo4 = new item({
    name : "Take a break"
});
//todo4.save();
app.get("/", function(req, res){
    item.find({})
        .then((foundItems)=>{
            res.render("list", {ejes : foundItems});
        })
        .catch((err)=>{
            console.log(err);
        })
});

app.post("/", function(req, res){
    const itemName = req.body.l1;
    const todo4 = new item({
        name: itemName
    });
    todo4.save();
    res.redirect("/");
});
app.post("/delete", function(req,res){
    const checked = req.body.checkbox1;
    item.deleteOne({_id:checked})
        .then(()=>{
            console.log("Deleted!");
            res.redirect("/");
        })
        .catch((err)=>{
            console.log(err);
        })
});

app.listen("4000", function(){
    console.log("Server Started.");
});
