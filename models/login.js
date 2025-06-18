let mongoose=require("mongoose");

let login=new mongoose.Schema({
    LogStr:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    LoginAt:{
        type:Date,
        default:Date.now
    }
});

let Login=mongoose.model("Login",login);

module.exports=Login;