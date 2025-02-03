import express from "express";
import {
  createGig,
  getGigs,
  getGig,
  applyGig,
  acceptApplication,
  deleteGig,
} from "../controllers/gigController.js";
import protect from "../middleware/authMiddleware.js";
import multer from "multer";


const upload = multer({dest: "uploads"})

const router = express.Router();

// Create a new gig
router.post("/", upload.single('image') , createGig)

// Get all gigs
router.get("/", getGigs);

// Get a gig by ID
router.get("/:id", getGig);

// Apply for a gig
router.post("/:gigId/apply", applyGig);

// Accept an application
router.patch("/:gigId/applications/:applicationId/accept", acceptApplication);

// Delete a gig
router.delete("/delete/:id", deleteGig);

export default router;
