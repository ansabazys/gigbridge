import Gig from "../models/Gig.js";

export const createGig = async (req, res) => {
  try {
    const gig = await Gig.create(req.body);
    res.status(201).json(gig);
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
