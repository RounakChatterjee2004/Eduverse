// routes/assessmentRoutes.js
import express from "express";
import Assessment from "../Models/Assessment.js";

const router = express.Router();

// Create an assessment
router.post("/create", async (req, res) => {
  const { name, subject, time, numberOfQuestions, password, questions } =
    req.body;

  try {
    const newAssessment = new Assessment({
      name,
      subject,
      time,
      numberOfQuestions,
      password,
      questions,
    });
    await newAssessment.save();
    res.status(201).json({
      message: "Assessment created successfully",
      assessment: newAssessment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all assessments
router.get("/allget", async (req, res) => {
  try {
    const assessments = await Assessment.find({});
    res.status(200).json(assessments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific assessment by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const assessment = await Assessment.findById(id);
    if (!assessment) {
      return res.status(404).json({ message: "Assessment not found" });
    }
    res.status(200).json(assessment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
