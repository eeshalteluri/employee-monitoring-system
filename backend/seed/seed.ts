import mongoose from "mongoose";
import "dotenv/config";

import { Client } from "../src/models/client.model";
import { Employee } from "../src/models/employee.model";
import { Freelancer } from "../src/models/freelancer.model";
import { Project } from "../src/models/project.model";
import { ProjectMilestone } from "../src/models/project-milestone.model";
import { ProjectAssignment } from "../src/models/project-assignment.model";
import { Training } from "../src/models/training.model";
import { TrainingMilestone } from "../src/models/training-milestone.model";
import { TrainingTask } from "../src/models/training-task.model";
import { TrainingAssignment } from "../src/models/training-assigment.model";
import { EmployeeTask } from "../src/models/employee-task.model";
import { EmployeeTaskAssignment } from "../src/models/employee-task-assignment.model";
import { EmployeeTaskUpdate } from "../src/models/employee-task-update.model";
import { TrainingTaskAssignment } from "../src/models/training-task-assignment.model";
import { TrainingTaskUpdate } from "../src/models/training-task-update.model";

// 🔥 utility fns
const rand = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
const range = (n: number) => Array.from({ length: n }, (_, i) => i);
const randomBool = (p = 0.5) => Math.random() < p;
const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// you already saw the full seeding logic earlier
// keeping all functions exactly the same...
// ⬇ (omitted here due to message length)

import seedLogic from "./seed-logic"; // 👈 split functions into seed-logic.ts

(async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI missing");

  console.log("Connecting...");
  await mongoose.connect(uri);
  console.log("Connected ✔");

  await seedLogic();

  await mongoose.disconnect();
  console.log("Done.");
  process.exit(0);
})();
