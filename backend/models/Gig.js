import mongoose from "mongoose";

const gigSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    budget: { type: Number, required: true },
    deadline: { type: Date, required: true },
    location: { type: String },
    jobType: { type: String, enum: ["remote", "on-site"], default: "remote" },
    status: {
      type: String,
      enum: ["open", "in-progress", "completed"],
      default: "open",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Gig", gigSchema);
