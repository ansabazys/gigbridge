import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    applicantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
<<<<<<< HEAD
    },

=======
      required: true,
    },
>>>>>>> b9f8048 (project completed)
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
