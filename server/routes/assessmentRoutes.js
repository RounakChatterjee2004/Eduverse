import express from "express";
import {
  createAssessment,
  getAllAssessments,
} from "../controllers/assessmentController.js";

const router = express.Router();

// Route to create a new assessment
router.post("/", createAssessment);

// Route to get all assessments
router.get("/", getAllAssessments);

export default router;
