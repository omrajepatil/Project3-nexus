import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:String,
    no:Number,
    date:Date,
    location:String,
    email : String,
    password : String,
    comment : String,
    from : String,
    to : String,
    guest : Number,
    sign_name:String,
    sign_email : String,
    sign_password : String


});


const User = new mongoose.model("User",userSchema);

export default User;

