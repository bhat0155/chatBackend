const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app)
const initializeSocket = require("./socket.js")

initializeSocket(server)

app.get("/", (req, res)=>{
    res.send("Hello Hello")
})

server.listen(4000, ()=>{
    console.log("server running on port 4000")
})