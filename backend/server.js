import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import gigRoutes from "./routes/gigRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
