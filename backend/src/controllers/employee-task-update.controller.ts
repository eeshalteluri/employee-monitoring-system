// src/controllers/employee-task-update.controller.ts
import { Request, Response } from "express";
import { EmployeeTaskUpdate } from "../models/employee-task-update.model";

export const createEmployeeTaskUpdate = async (req: Request, res: Response) => {
  try {
    const update = await EmployeeTaskUpdate.create(req.body);
    return res.status(201).json({ success: true, data: update });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const getEmployeeTaskUpdates = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query as any;

    const updates = await EmployeeTaskUpdate.find()
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await EmployeeTaskUpdate.countDocuments();

    return res.status(200).json({
      success: true,
      data: updates,
      pagination: { page, limit, total },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const getEmployeeTaskUpdateById = async (req: Request, res: Response) => {
  try {
    const update = await EmployeeTaskUpdate.findOne({ id: req.params.id });
    if (!update) return res.status(404).json({ message: "Employee task update not found" });

    return res.status(200).json({ success: true, data: update });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const updateEmployeeTaskUpdate = async (req: Request, res: Response) => {
  try {
    const update = await EmployeeTaskUpdate.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );

    if (!update) return res.status(404).json({ message: "Employee task update not found" });

    return res.status(200).json({ success: true, data: update });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const deleteEmployeeTaskUpdate = async (req: Request, res: Response) => {
  try {
    const update = await EmployeeTaskUpdate.findOneAndDelete({ id: req.params.id });
    if (!update) return res.status(404).json({ message: "Employee task update not found" });

    return res.status(200).json({ success: true, message: "Employee task update deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};
