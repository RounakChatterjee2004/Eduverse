// controllers/gptController.js
import OpenAI from "openai"; // Updated import
import Assessment from "../models/Assessment.js";
import dotenv from "dotenv";

dotenv.config();

// Configure OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Route to generate and save assessment
const generateQuestions = async (req, res) => {
  const { name, subject, password, topic, numberOfQuestions, time } = req.body;

  try {
    // Call OpenAI GPT-4 API to generate questions
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: `Generate ${numberOfQuestions} multiple-choice questions on the topic of ${topic} for the subject ${subject}. Each question should have 4 options: A, B, C, D, and specify the correct option.`,
        },
      ],
    });

    // Log the GPT response for debugging
    console.log("Raw GPT Response:", response);

    const gptContent = response.choices[0].message.content;
    const questions = parseQuestionsFromGPT(gptContent);

    // Check if questions were generated
    if (questions.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No questions were generated. Please try again.",
      });
    }

    // Save the assessment with questions into MongoDB
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

// Helper function to parse GPT-4 response into structured questions
const parseQuestionsFromGPT = (gptContent) => {
  const questions = [];
  const questionBlocks = gptContent.split(/\n{2,}/); // Split GPT response by double newlines

  questionBlocks.forEach((block) => {
    const lines = block.split("\n").filter((line) => line.trim() !== ""); // Filter out empty lines
    if (lines.length < 5) return; // Skip if there aren't enough lines for a question and options

    const questionText = lines[0].replace(/^\d+\.\s*/, "").trim(); // Remove leading numbers from question
    const options = [];

    // Extract options (A, B, C, D)
    for (let i = 1; i <= 4; i++) {
      const optionLine = lines[i];
      const match = optionLine.match(/^([A-D])\.\s*(.*)$/); // Regex to capture option letters and text
      if (match) {
        options.push(match[2].trim()); // Push the option text
      } else {
        options.push(null); // Handle invalid option format
      }
    }

    // Extract the correct option
    const answerLine = lines[5]; // Assuming the answer is on the 6th line
    const correctOption = answerLine.split(":")[1]?.trim(); // Extract the answer after "Answer:"

    // Ensure options and correct option are valid
    if (
      options.some((opt) => opt === null) ||
      !questionText ||
      !correctOption
    ) {
      console.error("Invalid question or options:", {
        questionText,
        options,
        correctOption,
      });
      return; // Skip invalid entries
    }

    questions.push({
      question: questionText,
      options,
      correctOption,
    });
  });

  return questions;
};

// Export the controller functions
export { generateQuestions };
