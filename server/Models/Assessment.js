// models/Assessment.js
import { Schema, model } from "mongoose";

const assessmentSchema = new Schema({
  name: { type: String, required: true },
  subject: { type: String, required: true },
  time: { type: Number, required: true }, // time in minutes
  numberOfQuestions: { type: Number, required: true },
  password: { type: String, required: true }, // Password to access the assessment
  questions: [
    {
      question: { type: String, required: true },
      options: [{ type: String, required: true }], // Array of 4 options
      correctOption: { type: String, required: true }, // Correct option
    },
  ],
});

const Assessment = model("Assessment", assessmentSchema);

export default Assessment;
