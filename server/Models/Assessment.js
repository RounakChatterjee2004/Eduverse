// models/Assessment.js
import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true }, // [A, B, C, D]
  correctOption: { type: String, required: true },
});

const assessmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subject: { type: String, required: true },
  time: { type: Number, required: true },
  numberOfQuestions: { type: Number, required: true },
  questions: { type: [questionSchema], required: true },
  password: { type: String, required: true },
});

const Assessment = mongoose.model("Assessment", assessmentSchema);
export default Assessment;
