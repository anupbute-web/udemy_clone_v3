const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const Register=require("./models/register");
const Login=require("./models/login");
const session=require("express-session");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(session({
    secret: 'anup',        
    resave: false,                    
    saveUninitialized: false,         
    cookie: {
        maxAge: 1000 * 60 * 60,       
        httpOnly: true,               
        secure: false                 
    }
}));
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

app.post("/register",async(req,res)=>{
    if(req.session.user) return res.redirect("/dashboard"); 
    let {username,email,pass}=req.body;
    let result=await Register.exists({email});
    console.log(result);

    if(!result){
        let newuser=new Register({username,email,pass});
        await newuser.save();
        let newuser1=new Login({username,email,pass});
        await newuser1.save();
        req.session.user={username,email};
    }else{
        return res.status(409).send("user exist");
    }
    res.redirect("/login");    
});

app.get("/login",(req,res)=>{
    res.render("login");
})

app.post("/login",async(req,res)=>{
    if(req.session.user) return res.redirect("/dashboard"); 
    let {email,pass}=req.body;
    let result=await Login.exists({email});
    if(!result){
        res.status(408).send("user not exist");
    }else{
        res.render("dashboard",{email});
    }
});

app.get("/dashboard",(req,res)=>{
    let email=req.session.user;
    console.log(email)
    res.render("dashboard",{email})
})

app.get("/logout",(req,res)=>{
    req.session.destroy();
    res.render("login")
})

app.listen(4040,()=>{console.log("hi")});

// added login register logout routes 
// tried to create seesion