const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`server running, ${socket.id}`);
  socket.on("send-message", (data) => {
    console.log(data);
    socket.broadcast.emit("receive_message", data);
  });
});
server.listen(5000, () => {
  console.log("server jalan");
});
