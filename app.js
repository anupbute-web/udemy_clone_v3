const express=require("express");
const mongoose=require("mongoose");
const app=express();

mongoose.connect("mongodb://localhost:27017/udemy_clone")
.then(()=>{console.log("done")})
.catch((err)=>{console.log(err)})


app.get("/",(req,res)=>{
    res.send("udemy_clone");
});

app.get("/register",(req,res)=>{

})

app.listen(4040);

