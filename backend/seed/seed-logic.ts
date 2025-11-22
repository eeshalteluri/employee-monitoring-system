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

import mongoose from "mongoose";

// Utils
const rand = <T>(arr: T[]): T => {
  if (!arr.length) {
    throw new Error("rand() called on empty array — seed dependency order broken");
  }
  return arr[Math.floor(Math.random() * arr.length)]!;
};
const range = (n: number) => Array.from({ length: n }, (_, i) => i);
const randomBool = (p = 0.5) => Math.random() < p;
const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Mock sources
const skills = ["React", "Node", "Python", "Design", "Marketing", "AI", "VA"];
const projectTypes = ["consulting", "web", "ai", "marketing"];
const priorities = ["low", "medium", "high", "critical"];
const projectStatuses = ["not_started", "in_progress", "on_hold", "completed", "cancelled"];

const countries = ["India", "US", "UK", "Canada", "Germany"];
const timezones = ["Asia/Kolkata", "America/New_York", "UTC", "Europe/Berlin"];

export default async function seedLogic() {
  console.log("🧹 Clearing old data...");

  await Promise.all([
    Client.deleteMany({}),
    Employee.deleteMany({}),
    Freelancer.deleteMany({}),
    Project.deleteMany({}),
    ProjectMilestone.deleteMany({}),
    ProjectAssignment.deleteMany({}),
    Training.deleteMany({}),
    TrainingMilestone.deleteMany({}),
    TrainingTask.deleteMany({}),
    TrainingAssignment.deleteMany({}),
    EmployeeTask.deleteMany({}),
    EmployeeTaskAssignment.deleteMany({}),
    EmployeeTaskUpdate.deleteMany({}),
    TrainingTaskAssignment.deleteMany({}),
    TrainingTaskUpdate.deleteMany({}),
  ]);

  console.log("⚡ Seeding employees...");
  const employees = await Employee.insertMany(
    range(20).map(() => ({
      userId: new mongoose.Types.ObjectId(),
      type: rand(["coder", "VA", "core", "lead", "freelancer", "intern"]),
      skills: [rand(skills), rand(skills)],
      isActive: randomBool(0.8),
    }))
  );

  console.log("⚡ Seeding clients...");
  const clients = await Client.insertMany(
    range(15).map(() => ({
      userId: rand(employees)!.userId,
      phone: `+1-555-${randomInt(100000, 999999)}`,
      type: rand(["new", "existing"]),
      isActive: randomBool(0.9),
    }))
  );

  console.log("⚡ Seeding projects...");
  const projects = await Project.insertMany(
    range(15).map((i) => {
      const lead = rand(employees);
      return {
        clientId: rand(clients)!._id,
        title: `Project ${i + 1}`,
        description: "Sample seeded project",
        tags: ["sample", rand(projectTypes)],
        projectType: rand(projectTypes),
        priority: rand(priorities),
        status: rand(projectStatuses),
        estimatedHours: randomInt(10, 100),
        totalHoursTaken: randomInt(0, 80),
        startDate: new Date(),
        endDate: randomBool() ? new Date() : undefined,
        isAssigned: true,
        leadership: [lead._id],
        leadAssignee: lead._id,
        VAInCharge: rand(employees)!._id,
        freelancers: range(randomInt(1, 3)).map(() => rand(employees)!._id),
        updateIncharge: rand(employees)!._id,
      };
    })
  );

  console.log("⚡ Seeding project milestones...");
  await ProjectMilestone.insertMany(
    projects.flatMap((project) =>
      range(2).map((i) => ({
        projectId: project._id,
        title: `Milestone ${i + 1} for ${project.title}`,
        dueDate: new Date(Date.now() + randomInt(1, 30) * 86400000),
        status: rand(["not_started", "in_progress", "completed", "delayed"]),
      }))
    )
  );

  console.log("⚡ Seeding project assignments...");
  await ProjectAssignment.insertMany(
    projects.flatMap((project) =>
      range(randomInt(2, 4)).map(() => {
        const emp = rand(employees);
        return {
          projectId: project._id,
          employeeId: emp._id,
          role: rand(["lead", "coder", "core", "va", "freelancer"]),
        };
      })
    )
  );

  console.log("⚡ Seeding trainings...");
  const trainings = await Training.insertMany(
    range(12).map((i) => ({
      title: `Training ${i + 1}`,
      description: "Seeded training module",
      type: rand(["technical", "soft-skills", "domain"]),
      domain: rand(["frontend", "backend", "ai", "ops"]),
      tags: ["training", "seed"],
      startDate: new Date(),
      endDate: randomBool() ? new Date() : undefined,
      status: rand(["draft", "ongoing", "completed"]),
    }))
  );

  console.log("⚡ Seeding training milestones...");
  await TrainingMilestone.insertMany(
    trainings.flatMap((training) =>
      range(2).map((i) => ({
        trainingId: training._id,
        title: `Milestone ${i + 1} for ${training.title}`,
        description: "Seeded training milestone",
        dueDate: new Date(Date.now() + randomInt(1, 30) * 86400000),
      }))
    )
  );

  console.log("⚡ Seeding training tasks...");
  const trainingTasks = await TrainingTask.insertMany(
    trainings.flatMap((training) =>
      range(2).map((i) => ({
        trainingId: String(training._id), // String ref
        title: `Task ${i + 1} for ${training.title}`,
        description: "Seeded training task",
        defaultTask: true,
        startDate: new Date(),
        endDate: new Date(Date.now() + randomInt(1, 7) * 86400000),
        weight: randomInt(1, 5),
      }))
    )
  );

  console.log("⚡ Seeding training assignments...");
  const trainingAssignments = await TrainingAssignment.insertMany(
    trainings.flatMap((training) =>
      range(randomInt(3, 7)).map(() => {
        const emp = rand(employees);
        return {
          trainingId: training._id,
          employeeId: emp._id,
          status: rand(["active", "completed", "dropped"]),
        };
      })
    )
  );

  console.log("⚡ Seeding employee tasks...");
  const employeeTasks = await EmployeeTask.insertMany(
    range(30).map((i) => ({
      title: `Employee Task ${i + 1}`,
      description: "Seeded employee task",
      defaultTask: true,
      startDate: new Date(),
      endDate: new Date(Date.now() + randomInt(1, 14) * 86400000),
      weight: randomInt(1, 5),
    }))
  );

  console.log("⚡ Seeding employee task assignments...");
  const employeeTaskAssignments = await EmployeeTaskAssignment.insertMany(
    employeeTasks.flatMap((task, idx) =>
      range(randomInt(1, 3)).map((i) => {
        const emp = rand(employees);
        return {
          id: `ETASSIGN-${idx}-${i}-${Date.now()}`,
          employeeTaskId: String(task._id),
          employeeId: String(emp._id),
          type: rand(["default", "personal"]),
          assignedAt: new Date(),
          startDate: new Date(),
          endDate: new Date(Date.now() + randomInt(1, 10) * 86400000),
          score: randomBool(0.5) ? randomInt(1, 10) : undefined,
        };
      })
    )
  );

  console.log("⚡ Seeding employee task updates...");
  await EmployeeTaskUpdate.insertMany(
    employeeTaskAssignments.flatMap((assign, idx) =>
      range(randomInt(1, 3)).map((i) => ({
        id: `ETUPDATE-${idx}-${i}-${Date.now()}`,
        employeeTaskAssignmentId: assign.id,
        employeeId: assign.employeeId,
        employeeTaskId: assign.employeeTaskId,
        date: new Date(Date.now() - randomInt(0, 5) * 86400000),
        status: rand(["in_progress", "blocked", "completed"]),
        isApproved: randomBool(0.3),
        notes: "Seeded update",
      }))
    )
  );

  console.log("⚡ Seeding training task assignments...");
  const trainingTaskAssignments = await TrainingTaskAssignment.insertMany(
    trainingTasks.flatMap((task, idx) =>
      range(randomInt(1, 3))
        .map(() => rand(trainingAssignments))
        .map((assign, i) => ({
          id: `TTASSIGN-${idx}-${i}-${Date.now()}`,
          trainingTaskId: String(task._id),
          trainingId: String(assign.trainingId),
          employeeId: String(assign.employeeId),
          type: rand(["default", "personal"]),
          assignedAt: new Date(),
          startDate: new Date(),
          endDate: new Date(Date.now() + randomInt(1, 10) * 86400000),
          score: randomBool(0.5) ? randomInt(1, 10) : undefined,
        }))
    )
  );

  console.log("⚡ Seeding training task updates...");
  await TrainingTaskUpdate.insertMany(
    trainingTaskAssignments.flatMap((assign, idx) =>
      range(randomInt(1, 3)).map((i) => ({
        id: `TTUPDATE-${idx}-${i}-${Date.now()}`,
        trainingTaskAssignmentId: assign.id,
        trainingId: assign.trainingId,
        trainingTaskId: assign.trainingTaskId,
        employeeId: assign.employeeId,
        date: new Date(Date.now() - randomInt(0, 5) * 86400000),
        status: rand(["in_progress", "blocked", "completed"]),
        isApproved: randomBool(0.3),
        notes: "Seeded training task update",
      }))
    )
  );

  console.log("🎉 SEEDING COMPLETED SUCCESSFULLY");
}
