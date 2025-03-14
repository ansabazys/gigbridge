import express from "express";
import Report from "../models/Report.js";
import Gig from "../models/Gig.js";

const router = express.Router();

// Report a gig
router.post("/report", async (req, res) => {
  try {
    const { gigId, reportedBy, reason } = req.body;

    const report = new Report({ gigId, reportedBy, reason });
    await report.save();

    res.status(201).json({ message: "Gig reported successfully", report });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Get all reported gigs (For Admin)
router.get("/reported-gigs", async (req, res) => {
  try {
    const reports = await Report.find().populate("gigId").populate("reportedBy", "name email");
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Admin deletes a reported gig
router.delete("/delete-gig/:gigId", async (req, res) => {
  try {
    const { gigId } = req.params;

    await Gig.findByIdAndDelete(gigId);
    await Report.deleteMany({ gigId });

    res.status(200).json({ message: "Gig deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
