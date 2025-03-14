import asyncHandler from "express-async-handler";
import User from "../models/User.js"; // Adjust the path to your model

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    res.json({
      _id: user._id,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export const getUsers = async (req, res) => {
  try {
<<<<<<< HEAD
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
=======
    const users = await User.find()
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
>>>>>>> b9f8048 (project completed)
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile/:id
// @access  Private
export const getGigUserProfile = asyncHandler(async (req, res) => {
  const userId = req.params.id; // Get user ID from URL parameters

  try {
    const user = await User.findById(userId).select("-password"); // Exclude password from the response

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user); // Return user data
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body.id);
  console.log(user)

  if (user) {
    user.fname = req.body.fname || user.fname;
    user.lname = req.body.lname || user.lname;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;

    const updatedUser = await user.save();

    console.log(updatedUser)

    res.json({
      _id: updatedUser._id,
      fname: updatedUser.fname,
      lname: updatedUser.lname,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Delete user account
// @route   DELETE /api/users/profile
// @access  Private
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  await user.deleteOne();
  res.json({ message: "User account deleted successfully" });
});
