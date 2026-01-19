const express= require("express");
const { is_user, auth } = require("../Middlewares/Auth");
const{recieve_messages,send_message} = require("../Controllers/Conversation");
const router= express.Router();

router.post("/send_message/:id",auth,is_user,send_message);
router.get("/recieve_messages/:id",auth,is_user,recieve_messages);
module.exports= router