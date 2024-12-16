import express from "express";
import { createGig, getGigs } from "../controllers/gigController.js";

const router = express.Router();

router.route("/").post(createGig).get(getGigs);

export default router;
