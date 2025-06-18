const express=require("express");
const mongoose=require("mongoose");
const path=require("path");
const app=express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.set("view engine","ejs");

mongoose.connect("mongodb://localhost:27017/udemy_clone")
.then(()=>{console.log("done")})
.catch((err)=>{console.log(err)});

app.get("/",(req,res)=>{
    res.render("home");
});

app.get("/register",(req,res)=>{
    res.render("register");
})

app.post("/register",(req,res)=>{
    
})

app.listen(4040,()=>{console.log("hi")});

