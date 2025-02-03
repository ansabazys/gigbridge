import express from "express";
import Message from "../models/Message.js";

const router = express.Router();

// Send a message
router.post("/", async (req, res) => {
  try {
    const { senderId, receiverId, message, gigId } = req.body;
    const newMessage = new Message({ senderId, receiverId, message, gigId });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
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
