import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import gigRoutes from "./routes/gigRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import notificationRoutes from './routes/NotificationRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import { Server } from "socket.io";
import http from "http";

dotenv.config();

const app = express();
const server = http.createServer(app)
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:5173", // Replace with your frontend URL
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true, // Allow cookies to be sent
};

app.use(cors(corsOptions));

// Connect to database
connectDB();

// Routes
// app.use("/api/auth", authRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/messages", messageRoutes);


// Setup Socket.io
const io = new Server(server, {
  cors: { origin: "http://localhost:5173" }, // Update with frontend URL
});

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  // Join room for messaging
  socket.on("join_room", (room) => {
    socket.join(room);
  });

  // Handle sending messages
  socket.on("send_message", (data) => {
    io.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
