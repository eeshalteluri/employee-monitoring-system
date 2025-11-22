// src/controllers/project-assignment.controller.ts
import { Request, Response } from "express";
import { ProjectAssignment } from "../models/project-assignment.model";

export const createProjectAssignment = async (req: Request, res: Response) => {
  try {
    const assignment = await ProjectAssignment.create(req.body);
    return res.status(201).json({ success: true, data: assignment });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const getProjectAssignments = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query as any;

    const assignments = await ProjectAssignment.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("projectId")
      .populate("employeeId");

    const total = await ProjectAssignment.countDocuments();

    return res.status(200).json({
      success: true,
      data: assignments,
      pagination: { page, limit, total },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const getProjectAssignmentById = async (req: Request, res: Response) => {
  try {
    const assignment = await ProjectAssignment.findById(req.params.id)
      .populate("projectId")
      .populate("employeeId");

    if (!assignment) return res.status(404).json({ message: "Project assignment not found" });

    return res.status(200).json({ success: true, data: assignment });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const updateProjectAssignment = async (req: Request, res: Response) => {
  try {
    const assignment = await ProjectAssignment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .populate("projectId")
      .populate("employeeId");

    if (!assignment) return res.status(404).json({ message: "Project assignment not found" });

    return res.status(200).json({ success: true, data: assignment });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const deleteProjectAssignment = async (req: Request, res: Response) => {
  try {
    const assignment = await ProjectAssignment.findByIdAndDelete(req.params.id);
    if (!assignment) return res.status(404).json({ message: "Project assignment not found" });

    return res.status(200).json({ success: true, message: "Project assignment deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};
