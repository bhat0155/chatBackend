const socket = require("socket.io");

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket)=>{
    socket.on("joinChat", ({firstName, userId, targetUser})=>{
        const roomId = [userId, targetUser].sort().join("_");
        socket.join(roomId);
        console.log(`${firstName} joined the room : ${roomId}`)

    })

    socket.on("sendMessage", ({firstName, userId, targetUser, mssg})=>{
        // creates a room and sends mssg to everyone in the room
        const roomId = [userId, targetUser].sort().join("_");
        console.log(`${firstName} sent the message: ${mssg}`)
        io.to(roomId).emit("MessageRecieved", {firstName, mssg})
    })

    socket.on("disconnect", ()=>{

    })
  })
};

module.exports = initializeSocket;
