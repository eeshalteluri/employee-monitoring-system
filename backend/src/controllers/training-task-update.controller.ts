// src/controllers/training-task-update.controller.ts
import { Request, Response } from "express";
import { TrainingTaskUpdate } from "../models/training-task-update.model";

export const createTrainingTaskUpdate = async (req: Request, res: Response) => {
  try {
    const update = await TrainingTaskUpdate.create(req.body);
    return res.status(201).json({ success: true, data: update });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const getTrainingTaskUpdates = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query as any;

    const updates = await TrainingTaskUpdate.find()
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await TrainingTaskUpdate.countDocuments();

    return res.status(200).json({
      success: true,
      data: updates,
      pagination: { page, limit, total },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const getTrainingTaskUpdateById = async (req: Request, res: Response) => {
  try {
    const update = await TrainingTaskUpdate.findOne({ id: req.params.id });
    if (!update) return res.status(404).json({ message: "Training task update not found" });

    return res.status(200).json({ success: true, data: update });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const updateTrainingTaskUpdate = async (req: Request, res: Response) => {
  try {
    const update = await TrainingTaskUpdate.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );

    if (!update) return res.status(404).json({ message: "Training task update not found" });

    return res.status(200).json({ success: true, data: update });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const deleteTrainingTaskUpdate = async (req: Request, res: Response) => {
  try {
    const update = await TrainingTaskUpdate.findOneAndDelete({ id: req.params.id });
    if (!update) return res.status(404).json({ message: "Training task update not found" });

    return res.status(200).json({ success: true, message: "Training task update deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};
