const express= require("express");
const { Signup, Login, otp,Logout } = require("../Controllers/Auth");
const { auth } = require("../Middlewares/Auth");
const router= express.Router();

// auth 
router.post('/signup',Signup)
router.post('/login', Login)
router.post('/send_otp',otp)
router.post("/logout",auth,Logout)
module.exports= router