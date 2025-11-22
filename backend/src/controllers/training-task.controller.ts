// src/controllers/training-task.controller.ts
import { Request, Response } from "express";
import { TrainingTask } from "../models/training-task.model";

export const createTrainingTask = async (req: Request, res: Response) => {
  try {
    const task = await TrainingTask.create(req.body);
    return res.status(201).json({ success: true, data: task });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const getTrainingTasks = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query as any;

    const tasks = await TrainingTask.find()
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await TrainingTask.countDocuments();

    return res.status(200).json({
      success: true,
      data: tasks,
      pagination: { page, limit, total },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const getTrainingTaskById = async (req: Request, res: Response) => {
  try {
    const task = await TrainingTask.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Training task not found" });

    return res.status(200).json({ success: true, data: task });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const updateTrainingTask = async (req: Request, res: Response) => {
  try {
    const task = await TrainingTask.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) return res.status(404).json({ message: "Training task not found" });

    return res.status(200).json({ success: true, data: task });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const deleteTrainingTask = async (req: Request, res: Response) => {
  try {
    const task = await TrainingTask.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Training task not found" });

    return res.status(200).json({ success: true, message: "Training task deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};
