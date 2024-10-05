import mongoose from "mongoose";

// Define the question schema
const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true }, // [A, B, C, D]
  correctOption: { type: String, required: true },
});

// Define the assessment schema
const assessmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subject: { type: String, required: true },
  time: { type: Number, required: true },
  numberOfQuestions: { type: Number, required: true },
  questions: { type: [questionSchema], required: true },
  password: { type: String, required: true },
});

// Use existing model if already compiled, otherwise create a new one
const Assessment =
  mongoose.models.Assessment || mongoose.model("Assessment", assessmentSchema);

export default Assessment;
