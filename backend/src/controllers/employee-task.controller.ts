// src/controllers/employee-task.controller.ts
import { Request, Response } from "express";
import { EmployeeTask } from "../models/employee-task.model";

export const createEmployeeTask = async (req: Request, res: Response) => {
  try {
    const task = await EmployeeTask.create(req.body);
    return res.status(201).json({ success: true, data: task });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const getEmployeeTasks = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query as any;

    const tasks = await EmployeeTask.find()
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await EmployeeTask.countDocuments();

    return res.status(200).json({
      success: true,
      data: tasks,
      pagination: { page, limit, total },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const getEmployeeTaskById = async (req: Request, res: Response) => {
  try {
    const task = await EmployeeTask.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Employee task not found" });

    return res.status(200).json({ success: true, data: task });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const updateEmployeeTask = async (req: Request, res: Response) => {
  try {
    const task = await EmployeeTask.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) return res.status(404).json({ message: "Employee task not found" });

    return res.status(200).json({ success: true, data: task });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const deleteEmployeeTask = async (req: Request, res: Response) => {
  try {
    const task = await EmployeeTask.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Employee task not found" });

    return res.status(200).json({ success: true, message: "Employee task deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};
