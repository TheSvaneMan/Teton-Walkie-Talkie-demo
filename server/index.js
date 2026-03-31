// server/index.js
import express from "express";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Vite's default port
    methods: ["GET", "POST"],
  },
});

// Temporary In-Memory DB for active users
let chatRoomUsers = [];

// HarperDB Logic Placeholder
// const dbUrl = process.env.HARPERDB_URL;
// const dbPw = process.env.HARPERDB_PW;

io.on("connection", (socket) => {
  console.log(`🟢 User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    const { username, room } = data;
    socket.join(room);

    // Add user to in-memory tracking
    chatRoomUsers.push({ id: socket.id, username, room });

    // Filter users in this specific room and send to all clients in that room
    const usersInRoom = chatRoomUsers.filter((user) => user.room === room);
    io.in(room).emit("chatroom_users", usersInRoom);

    console.log(`🚪 ${username} joined room: ${room}`);
  });

  socket.on("send_message", (data) => {
    // Broadcast message to everyone in the room EXCEPT the sender (optional, or to everyone)
    io.in(data.room).emit("receive_message", data);
  });

  socket.on("leave_room", (data) => {
    const { username, room } = data;
    socket.leave(room);

    // Remove user from tracking
    chatRoomUsers = chatRoomUsers.filter((user) => user.id !== socket.id);
    const usersInRoom = chatRoomUsers.filter((user) => user.room === room);

    // Update the room's user list
    io.in(room).emit("chatroom_users", usersInRoom);
    console.log(`👋 ${username} left room: ${room}`);
  });

  socket.on("disconnect", () => {
    // Handle unexpected disconnects (closing the tab)
    const user = chatRoomUsers.find((user) => user.id === socket.id);
    if (user) {
      chatRoomUsers = chatRoomUsers.filter((u) => u.id !== socket.id);
      const usersInRoom = chatRoomUsers.filter((u) => u.room === user.room);
      io.in(user.room).emit("chatroom_users", usersInRoom);
    }
    console.log(`🔴 User Disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`🚀 Walkie-Talkie Server running on port ${PORT}`);
});
