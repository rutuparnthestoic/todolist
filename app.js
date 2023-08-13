const express = require("express"); 
const bp = require("body-parser");  
const app = express(); 

app.set('view engine', 'ejs'); 
let tasks = [];
let impTasks = [];

app.use(bp.urlencoded({extended: true}));
app.use(express.static("public")); 


app.get("/", function(req, res){
    let today = new Date();
    let options = {weekday: "long", month:"long", day:"numeric"};
    let day = today.toLocaleDateString("en-US",options);
    res.render("list", {listName: day, newListItems: tasks}); 

});

app.get("/imp", function(req,res){
    res.render("list", {listName: "Important tasks", newListItems: impTasks});
})

app.get("/about", function(req,res){
    res.render("about"); 
})

app.post("/", function(req,res){ 
    let task = req.body.queryTask;

    if(req.body.list === "Important tasks"){ 
        impTasks.push(task);
        res.redirect("/imp");
        console.log(task);
    } else { 
        tasks.push(task);
        res.redirect("/");
    }
})
    

app.listen(process.env.PORT || 3000, function(){
    console.log("Server started!");
});