const mongoose= require("mongoose");

const db_connect =()=>{

const url= process.env.DB_URL;
mongoose.connect(url)
.then(()=>{
    console.log("db connected successfully !")
})
.catch((error)=>{
    console.log(error);
    console.log("Error while connecting db!");
})
}
module.exports= db_connect;