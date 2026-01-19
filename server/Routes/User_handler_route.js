const express = require("express");
const router = express.Router();
const { auth } = require("../Middlewares/Auth");

const { Search_user, get_chatters } = require("../Controllers/User_handler");

router.get("/search", auth, Search_user);
router.get("/get_chatters", auth, get_chatters);

module.exports = router;