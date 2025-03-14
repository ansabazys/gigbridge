import express from "express";
import jwt from "jsonwebtoken";
import { registerUser, loginUser, logoutUser } from "../controllers/authController.js";

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post("/register", registerUser);

// @route   POST /api/auth/login
// @desc    Authenticate user & set JWT in cookies
// @access  Public
router.post("/login", loginUser);

// @route   POST /api/auth/logout
// @desc    Logout user & clear JWT cookie
// @access  Public
router.post("/logout", logoutUser);

// Admin Login
router.post("/admin/login", async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body)
  
    if (username === "admin" && password === "admin") {
      const token = jwt.sign({ role: "admin" }, "SECRET_KEY", { expiresIn: "1h" });
      return res.json({ message: "Admin logged in successfully", token });
    }
  
    res.status(401).json({ message: "Invalid credentials" });
  });

export default router;
