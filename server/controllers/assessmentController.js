import Assessment from "../models/Assessment.js";

// Controller function to create a new assessment
export const createAssessment = async (req, res) => {
  const { name, subject, password, questions, numberOfQuestions, time } =
    req.body;

  try {
    const newAssessment = new Assessment({
      name,
      subject,
      password,
      questions,
      numberOfQuestions,
      time,
    });

    await newAssessment.save();

    res.status(201).json({
      success: true,
      message: "Assessment created successfully",
      assessment: newAssessment,
    });
  } catch (error) {
    console.error("Error creating assessment:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller function to get all assessments
export const getAllAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.find();
    res.status(200).json({
      success: true,
      assessments,
    });
  } catch (error) {
    console.error("Error fetching assessments:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};
