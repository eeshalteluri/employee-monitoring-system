import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

import apiRoutes from "./routes";

// 🔥 Register models
import "./models/user.model";
import "./models/employee.model";
import "./models/client.model";

import "./models/employee-task-assignment.model";
import "./models/employee-task-update.model";
import "./models/employee-task.model";
import "./models/freelancer.model";

import "./models/project.model";
import "./models/project-assignment.model";
import "./models/project-milestone.model";

import "./models/training-assigment.model";
import "./models/training-milestone.model";
import "./models/training-task-assignment.model";
import "./models/training-task-update.model";
import "./models/training-task.model";
import "./models/training.model";

import "./models/file.model";

const app = express();
app.use(cors());
app.use(express.json());

async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("DB Connection Error:", err);
    process.exit(1);
  }
}
start();

// Test
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Express backend!" });
});

// APIs
app.use("/api", apiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Backend server running on http://localhost:${PORT}`)
);
