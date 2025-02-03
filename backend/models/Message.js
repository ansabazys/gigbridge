import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: { type: String, required: true },
    gigId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gig",
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Message", MessageSchema);
