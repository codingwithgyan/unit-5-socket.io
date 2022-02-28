const express = require('express');
const { createServer } = require('http');
const app = express();
const server = createServer();
const cors = require('cors');
const {Server} = require("socket.io");
const io = new Server(server,{
    cors:{
        origin:'*'
    }
});

io.on("connection",(socket)=>{
    console.log("New user connected");
    socket.join("room1");
    console.log(socket.id);
    socket.to("room1").emit("new_user_joined",{id:socket.id});

    socket.on("push_to_all",(data)=>{
            socket.to('room1').emit("new_message",data);
    })

    socket.on("disconnect", (socket) => {
        console.log("User disconnected");
    });
});




server.listen(2345,()=>{
    console.log("listening on port 2345");
});