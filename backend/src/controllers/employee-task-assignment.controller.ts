// src/controllers/employee-task-assignment.controller.ts
import { Request, Response } from "express";
import { EmployeeTaskAssignment } from "../models/employee-task-assignment.model";

export const createEmployeeTaskAssignment = async (req: Request, res: Response) => {
  try {
    const assignment = await EmployeeTaskAssignment.create(req.body);
    return res.status(201).json({ success: true, data: assignment });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const getEmployeeTaskAssignments = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query as any;

    const assignments = await EmployeeTaskAssignment.find()
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await EmployeeTaskAssignment.countDocuments();

    return res.status(200).json({
      success: true,
      data: assignments,
      pagination: { page, limit, total },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const getEmployeeTaskAssignmentById = async (req: Request, res: Response) => {
  try {
    const assignment = await EmployeeTaskAssignment.findOne({ id: req.params.id });
    if (!assignment) return res.status(404).json({ message: "Employee task assignment not found" });

    return res.status(200).json({ success: true, data: assignment });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const updateEmployeeTaskAssignment = async (req: Request, res: Response) => {
  try {
    const assignment = await EmployeeTaskAssignment.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );

    if (!assignment) return res.status(404).json({ message: "Employee task assignment not found" });

    return res.status(200).json({ success: true, data: assignment });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const deleteEmployeeTaskAssignment = async (req: Request, res: Response) => {
  try {
    const assignment = await EmployeeTaskAssignment.findOneAndDelete({ id: req.params.id });
    if (!assignment) return res.status(404).json({ message: "Employee task assignment not found" });

    return res.status(200).json({ success: true, message: "Employee task assignment deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};
