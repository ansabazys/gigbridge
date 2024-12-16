import express from "express";
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

export default router;
