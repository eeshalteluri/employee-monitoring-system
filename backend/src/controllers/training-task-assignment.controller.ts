// src/controllers/training-task-assignment.controller.ts
import { Request, Response } from "express";
import { TrainingTaskAssignment } from "../models/training-task-assignment.model";

export const createTrainingTaskAssignment = async (req: Request, res: Response) => {
  try {
    const record = await TrainingTaskAssignment.create(req.body);
    return res.status(201).json({ success: true, data: record });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const getTrainingTaskAssignments = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query as any;

    const assignments = await TrainingTaskAssignment.find()
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await TrainingTaskAssignment.countDocuments();

    return res.status(200).json({
      success: true,
      data: assignments,
      pagination: { page, limit, total },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const getTrainingTaskAssignmentById = async (req: Request, res: Response) => {
  try {
    const record = await TrainingTaskAssignment.findOne({ id: req.params.id });
    if (!record) return res.status(404).json({ message: "Training task assignment not found" });

    return res.status(200).json({ success: true, data: record });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const updateTrainingTaskAssignment = async (req: Request, res: Response) => {
  try {
    const record = await TrainingTaskAssignment.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );

    if (!record) return res.status(404).json({ message: "Training task assignment not found" });

    return res.status(200).json({ success: true, data: record });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const deleteTrainingTaskAssignment = async (req: Request, res: Response) => {
  try {
    const record = await TrainingTaskAssignment.findOneAndDelete({ id: req.params.id });
    if (!record) return res.status(404).json({ message: "Training task assignment not found" });

    return res.status(200).json({ success: true, message: "Training task assignment deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};
