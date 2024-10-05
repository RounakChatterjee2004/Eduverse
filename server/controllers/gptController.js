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

// Analyze user performance and provide feedback
const analyzePerformance = (req, res) => {
  const { questions, correctAnswers, userAnswers } = req.body;

  if (!questions || !correctAnswers || !userAnswers) {
    return res.status(400).json({
      success: false,
      message:
        "Missing required fields: questions, correctAnswers, or userAnswers.",
    });
  }

  let correctCount = 0;
  let incorrectCount = 0;
  const feedback = {
    correctAnswers: [],
    wrongAnswers: [],
    areasToImprove: [],
  };

  questions.forEach((question, index) => {
    const userAnswer = userAnswers[index];
    const correctAnswer = correctAnswers[index];

    if (userAnswer === correctAnswer) {
      correctCount++;
      feedback.correctAnswers.push({
        question,
        answer: userAnswer,
      });
    } else {
      incorrectCount++;
      feedback.wrongAnswers.push({
        question,
        answer: userAnswer,
        correctAnswer,
      });

      // Identify area for improvement based on the question
      feedback.areasToImprove.push({
        question,
        topic: identifyTopic(question), // Implement this function to identify topics
      });
    }
  });

  const totalQuestions = questions.length;
  const accuracy = ((correctCount / totalQuestions) * 100).toFixed(2);

  res.status(200).json({
    success: true,
    report: {
      totalQuestions,
      correctCount,
      incorrectCount,
      accuracy,
      feedback,
    },
  });
};

// Helper function to identify the topic of a question
const identifyTopic = (question) => {
  // Placeholder for topic identification logic
  // You can customize this based on your assessment topics
  if (question.includes("Newton")) {
    return "Newton's Laws of Motion";
  }
  // Add more conditions for other topics
  return "General";
};

// Export the controller functions
export { generateQuestions, analyzePerformance };

// Export the controller functions
