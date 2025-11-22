// src/controllers/training-assignment.controller.ts
import { Request, Response } from "express";
import { TrainingAssignment } from "../models/training-assigment.model";

export const createTrainingAssignment = async (req: Request, res: Response) => {
  try {
    const record = await TrainingAssignment.create(req.body);
    return res.status(201).json({ success: true, data: record });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const getTrainingAssignments = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query as any;

    const assignments = await TrainingAssignment.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("trainingId")
      .populate("employeeId");

    const total = await TrainingAssignment.countDocuments();

    return res.status(200).json({
      success: true,
      data: assignments,
      pagination: { page, limit, total },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const getTrainingAssignmentById = async (req: Request, res: Response) => {
  try {
    const record = await TrainingAssignment.findById(req.params.id)
      .populate("trainingId")
      .populate("employeeId");

    if (!record) return res.status(404).json({ message: "Training assignment not found" });

    return res.status(200).json({ success: true, data: record });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const updateTrainingAssignment = async (req: Request, res: Response) => {
  try {
    const record = await TrainingAssignment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .populate("trainingId")
      .populate("employeeId");

    if (!record) return res.status(404).json({ message: "Training assignment not found" });

    return res.status(200).json({ success: true, data: record });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const deleteTrainingAssignment = async (req: Request, res: Response) => {
  try {
    const record = await TrainingAssignment.findByIdAndDelete(req.params.id);
    if (!record) return res.status(404).json({ message: "Training assignment not found" });

    return res.status(200).json({ success: true, message: "Training assignment deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};
