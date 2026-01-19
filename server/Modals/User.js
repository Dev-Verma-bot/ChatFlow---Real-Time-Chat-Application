const mongoose= require("mongoose");

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        trim: true,
    },    
    last_name: {
        type: String,
        required: true,
        trim: true,
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile"
    },
    role:{
        type:String,
        required:true,
        enum:["Admin","User"]
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        req:true,
        trim:true
    },
    user_name: {
        type: String,
        required: true,
        unique: true
    },
    profile_pic: {
        type: String,
        default:""
    },    

},{timestamps:true});

module.exports= mongoose.model("User", userSchema);