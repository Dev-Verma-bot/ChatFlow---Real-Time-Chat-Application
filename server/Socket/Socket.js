const {Server}= require("socket.io");
const http= require("http");
const express = require("express");

const App= express();

const server= http.createServer(App);

const io= new Server(server,{
    cors:{
        origin:process.env.FRONTEND_URL,
        methods:['GET','POST']
    }
})

const getRecieverSocketID=(recieverID)=>{
    return usersocketmap[recieverID];
}

const usersocketmap= {}; //reciever socket id 

// whenever the user open the app connection established until it not close the app 
io.on('connection',(socket)=>{
    // frontend send the userid using the handshake (fetching that user id )
    const userID= socket.handshake.query.userId;
    console.log("user id is this ->",userID);
    // if the user id is not present in the phonebook then it add it to the phonebook 
    // Added a check for "null" as well to be safe
    if(userID !== 'undefined' && userID !== 'null') usersocketmap[userID]= socket.id;

    // sends brodcast message who is online means basically send the usersocket map 
    io.emit("getOnlineUsers",Object.keys(usersocketmap));

    // on disconnect it delete the user id from the phonebook then again send the updated phone book 
    socket.on("disconnect",()=>{
        delete usersocketmap[userID];
        io.emit("getOnlineUsers",Object.keys(usersocketmap));
    })
})
module.exports= {getRecieverSocketID,App,io,server}