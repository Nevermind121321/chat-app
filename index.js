import express from "express";
import { createServer } from "http";
import { fileURLToPath } from "url";
import path from "path";
import { Server } from "socket.io";
import { Socket } from "engine.io-client";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
const server = createServer(app);


const io = new Server(server);

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})

io.on("connection",(socket) => {
    console.log("User connected");
    socket.on("disconnect",() => {
        console.log("User disconnected");
    })
    socket.on("chat-message", (msg)=>{
        io.emit("chat-message",`${socket.nickname} : ${msg}`)
    })

    socket.on("set-nickname",(name) => {
        socket.nickname = name;
    })
}) 

server.listen(8000,()=>{
    console.log("Listening to port");
})