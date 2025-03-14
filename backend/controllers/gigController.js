import expressAsyncHandler from "express-async-handler";
import Gig from "../models/Gig.js";
import Notification from "../models/Notification.js";
import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";

// Create a new gig
export const createGig = async (req, res) => {
  try {
    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // Upload image to Cloudinary
    cloudinary.uploader.upload(req.file.path, async (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Error uploading image to Cloudinary",
        });
      }

      // Get the uploaded image URL from the result
      const imageUrl = result.secure_url;

      // Create a new gig with the image URL and other details
      const newGig = new Gig({ ...req.body, image: imageUrl });
      const savedGig = await newGig.save();

      // Get all users except the owner (req.body.user is the owner ID)
      const users = await User.find({ _id: { $ne: req.body.user } }); // Exclude the gig owner

      // Notify all users except the owner
      users.forEach(async (user) => {
        const notification = new Notification({
          userId: user._id, // The user receiving the notification
          message: `A new gig titled '${savedGig.title}' has been posted.`,
          gigId: savedGig._id, // Link to the new gig
        });
        await notification.save();
      });

      // Respond with the created gig
      res.status(201).json(savedGig);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Apply for a gig
export const applyGig = async (req, res) => {
  try {
    const { gigId } = req.params;
    const { applicantId, applicantName, message } = req.body;

    console.log(applicantId)

    const gig = await Gig.findById(gigId);
    if (!gig) return res.status(404).json({ message: "Gig not found." });

    // Add application to gig
    const application = { applicantId, applicantName, message };
    gig.application.push(application);
    const savedGig = await gig.save();

    // Get the newly added application ID
    const newApplication =
      savedGig.application[savedGig.application.length - 1];
    const applicationId = newApplication._id;

    // Notify the gig owner
    const notification = new Notification({
      userId: gig.user,
      applicantId: applicantId,
      message: `${applicantName} applied for your gig: '${gig.title}'`,
      gigId,
      applicationId, // Include applicationId in the notification
    });

    await notification.save();

    res.status(200).json({
      message: "Application submitted successfully.",
      gig: savedGig,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Accept application
export const acceptApplication = async (req, res) => {
  try {
    const { gigId, applicationId } = req.params;
    console.log()

    const gig = await Gig.findById(gigId);
    if (!gig) return res.status(404).json({ message: "Gig not found." });

    const application = gig.application.id(applicationId);
    if (!application)
      return res.status(404).json({ message: "Application not found." });

    application.status = "accepted";
    gig.status = "in-progress";
    await gig.save();

    // Notify the applicant
    const notification = new Notification({
      userId: application.applicantId,
      message: `Your application for '${gig.title}' has been accepted!`,
      gigId,
    });
    await notification.save();

    res.status(200).json({ message: "Application accepted.", gig });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteGig = expressAsyncHandler(async (req, res) => {
  const gigId = req.params.id;

  try {
    // Find the gig by ID
    const gig = await Gig.findById(gigId);

    if (!gig) {
      res.status(404);
      throw new Error("Gig not found");
    }

    // Delete notifications related to the gig
    await Notification.deleteMany({ gigId });

    // Delete the gig
    await gig.deleteOne();

    res
      .status(200)
      .json({ message: "Gig and related notifications deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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
