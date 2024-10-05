import express from "express";
import { analyzePerformance } from "../controllers/gptController.js";

const router = express.Router();

// Route to analyze user performance
router.post("/feedback", analyzePerformance);

export default router;
