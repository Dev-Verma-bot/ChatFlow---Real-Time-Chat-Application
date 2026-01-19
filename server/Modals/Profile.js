const mongoose= require("mongoose");
const ProfileSchema = new mongoose.Schema({
    age: {
        type: Number,
        default:null
    },
    gender:{
        type:String,
        default:null
    },
    description: {
        type: String,
        default: ""
    },
    social_links: {
        twitter: { type: String,default:null },
        linkedin: { type: String,default:null },
    },
},{timestamps:true});

module.exports = mongoose.model("Profile", ProfileSchema);