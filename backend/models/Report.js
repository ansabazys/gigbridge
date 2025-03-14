import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    gigId: { type: mongoose.Schema.Types.ObjectId, ref: "Gig", required: true },
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    reason: { type: String, required: true },
    status: { type: String, enum: ["Pending", "Reviewed"], default: "Pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Report", reportSchema);
