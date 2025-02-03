import express from "express";
import { getUserProfile, updateUserProfile, deleteUser, getGigUserProfile, getUsers } from "../controllers/userController.js";
import  protect  from "../middleware/authMiddleware.js";

const router = express.Router();

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get("/profile", protect, getUserProfile);
router.get("/profile/:id", getGigUserProfile);
router.get("/", getUsers);

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put("/profile", protect, updateUserProfile);

// @route   DELETE /api/users/profile
// @desc    Delete user account
// @access  Private
router.delete("/profile", protect, deleteUser);

export default router;
