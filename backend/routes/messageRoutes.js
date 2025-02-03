import express from "express";
import Message from "../models/Message.js";

const router = express.Router();

// Send a message
router.post("/", async (req, res) => {
  try {
    console.log("Request Body:", req.body);  // Log the incoming data
    const { senderId, receiverId, message, gigId } = req.body;
    
    // Create new message
    const newMessage = new Message({ senderId, receiverId, message, gigId });
    const savedMessage = await newMessage.save();
    console.log("Saved Message:", savedMessage);
    
    res.status(201).json(savedMessage);  // Respond with the saved message
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ message: error.message });
  }
});


// Get messages between two users
router.get("/:user1/:user2", async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { senderId: req.params.user1, receiverId: req.params.user2 },
        { senderId: req.params.user2, receiverId: req.params.user1 },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
