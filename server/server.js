// server.js
import express from "express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import assessmentRoutes from "./routes/assessmentRoutes.js"; // Import assessment routes
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import gptRoutes from "./routes/gptRoutes.js";
import gptFeedback from "./routes/gptFeedback.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
connectDB();

// Use auth routes
app.use("/api/auth", authRoutes);
app.use("/api/assessment", assessmentRoutes); // Use assessment routes
app.use("/api/gpt", gptRoutes);
app.use("/api/gpt1/", gptFeedback);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
