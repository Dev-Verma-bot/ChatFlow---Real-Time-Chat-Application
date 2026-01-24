require('dotenv').config();
const express = require("express");
const db_connect = require("./Configuration/db_connect");
const cloudinary_connect = require("./Configuration/Cloudinary_connect");
const cookie_parser = require("cookie-parser");
const file_upload = require("express-fileupload");
const cors = require("cors");

const User_route = require("./Routes/User_route");
const Convsation_route = require("./Routes/Conversation_route");
const Search_route = require("./Routes/User_handler_route");

const App = express();
const PORT = process.env.PORT_NO || 4000;

// 1. DATABASE & CLOUD CONNECTIONS
db_connect();
cloudinary_connect();

// 2. MIDDLEWARE (Must be before Routes)
App.use(express.json()); // Essential for Axios POST requests
App.use(cookie_parser());
App.use(file_upload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

// CORS Configuration
App.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000", // Fallback for safety
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"], // Explicitly allow these
  })
);

// 3. ROUTES
App.use("/Convoo/auth", User_route);
App.use("/Convoo/message", Convsation_route);
App.use("/Convoo/search_user", Search_route);

App.get("/", (req, res) => {
  res.send("Server is running smoothly");
});

// 4. START SERVER (Always at the end)
App.listen(PORT, () => {
  console.log(`Server started at port no ${PORT}`);
});