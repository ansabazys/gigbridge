import mongoose from "mongoose";

const gigSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: String, // Array of image URLs
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    budget: { type: Number, required: true },
    deadline: { type: Date, required: true },
    location: { type: String },
    category: { type: String },
    jobType: { type: String, enum: ["remote", "on-site"], default: "remote" },
    status: {
      type: String,
      enum: ["open", "in-progress", "completed"],
      default: "open",
    },
    application: [
      {
        applicantId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        applicantName: {
          type: String,
          required: true,
        },
        message: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          enum: ["pending", "accepted", "rejected"],
          default: "pending",
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Gig", gigSchema);
