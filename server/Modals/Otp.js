const mongoose= require("mongoose");
const otp= mongoose.Schema({
   email:{
    type:String,
    trim:true,
    required:true
   },
   value:{
    type:String,
    required:true
   },
   created_at:{
    type:Date,
    default:Date.now,
    expires:5*60,
   }

});

module.exports= mongoose.model("Otp",otp);