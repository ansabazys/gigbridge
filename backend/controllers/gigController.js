import expressAsyncHandler from "express-async-handler";
import Gig from "../models/Gig.js";

export const createGig = async (req, res) => {
  try {
    const gig = await Gig.create(req.body);
    res.status(201).json(gig);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add an application to a gig
export const addApplication = expressAsyncHandler(async (req, res) => {
  const { id } = req.params; // Extract gig ID from URL params
  const { applicantId, applicantName, message } = req.body; // Get applicant details from the request body

  if (!applicantId || !message) {
    res.status(400);
    throw new Error("Applicant ID and message are required.");
  }

  try {
    // Find the gig by ID
    const gig = await Gig.findById(id);

    if (!gig) {
      res.status(404);
      throw new Error("Gig not found.");
    }

    // Update the applications array
    gig.application.push({ applicantId, applicantName, message });

    // Save the updated gig
    const updatedGig = await gig.save();

    res.status(200).json({
      message: "Application added successfully.",
      gig: updatedGig,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

export const acceptApplication = async (req, res) => {
  const { gigId, applicationId } = req.params; // Extract gig and application IDs from the URL

  try {
    const gig = await Gig.findById(gigId);

    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    // Find the application to update
    const application = gig.application.find(
      (app) => app._id.toString() === applicationId
    );

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Update the application's status
    application.status = "accepted"
    gig.status = "in-progress";

    await gig.save(); // Save changes to the database

    res.status(200).json({
      message: "Application accepted successfully",
      gig,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating application status" });
  }
};


export const deleteGig = expressAsyncHandler(async (req, res) => {
  const gigId = req.params.id;
  console.log(gigId);

  // Find the gig by ID
  const gig = await Gig.findById(gigId);

  if (!gig) {
    res.status(404);
    throw new Error("Gig not found");
  }

  // Verify that the logged-in user owns the gig
  // if (gig.user.toString() !== req.user.id) {
  //   res.status(403);
  //   throw new Error("You are not authorized to delete this gig");
  // }

  // Delete the gig
  await gig.deleteOne();

  res.status(200).json({ message: "Gig deleted successfully" });
});

export const getGig = async (req, res) => {
  const gigId = req.params.id;
  try {
    const gig = await Gig.findById(gigId);
    res.status(200).json(gig);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getGigs = async (req, res) => {
  try {
    const gigs = await Gig.find();
    res.status(200).json(gigs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
