import express from "express";
import { acceptApplication, addApplication, createGig, deleteGig, getGig, getGigs,  } from "../controllers/gigController.js";

const router = express.Router();

router.route("/").post(createGig).get(getGigs);

router.get("/:id", getGig)
router.post("/:id/apply", addApplication);
router.delete("/delete/:id", deleteGig)
router.patch("/:gigId/application/:applicationId/accept", acceptApplication);


export default router;
