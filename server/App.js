
require('dotenv').config();
const express= require("express");
const db_connect = require("./Configuration/db_connect");
const cloudinary_connect = require("./Configuration/Cloudinary_connect");
const cookie_parser = require("cookie-parser");
const file_upload = require("express-fileupload");

const User_route= require("./Routes/User_route");
const Convsation_route= require("./Routes/Conversation_route")
const Search_route= require("./Routes/User_handler_route");
const App=express();

const PORT= process.env.PORT_NO||4000;

cloudinary_connect();
db_connect();
App.listen(PORT,()=>{

  console.log("Server started at port no",PORT);
})
App.use(express.json());
App.use(cookie_parser());
App.use(file_upload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

App.use("/Convoo/auth",User_route);
App.use("/Convoo/message",Convsation_route)
App.use("/Convoo/search_user",Search_route)

App.get("/", (req, res) => {
  res.send("on homepage");
});
