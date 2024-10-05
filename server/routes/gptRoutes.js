import express from "express";
import { generateQuestions } from "../controllers/gptController.js";

const router = express.Router();

// Route to generate and save assessment
router.post("/generate-questions", generateQuestions);

export default router;
