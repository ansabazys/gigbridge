import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: { type: String, required: true },
    gigId: { type: mongoose.Schema.Types.ObjectId, ref: "Gig" },
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gig.application",
    }, // Add this line
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);
