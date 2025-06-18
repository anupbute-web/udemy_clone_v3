let mongoose=require("mongoose");

let login=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true
    },
    pass:{
        type:String,
        required:true,
        trim:true
    },
    LoginAt:{
        type:Date,
        default:Date.now
    }
});

let Login=mongoose.model("Login1",login);

module.exports=Login;