// src/controllers/training.controller.ts
import { Request, Response } from "express";
import { Training } from "../models/training.model";

export const createTraining = async (req: Request, res: Response) => {
  try {
    const training = await Training.create(req.body);
    return res.status(201).json({ success: true, data: training });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const getTrainings = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query as any;

    const trainings = await Training.find()
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Training.countDocuments();

    return res.status(200).json({
      success: true,
      data: trainings,
      pagination: { page, limit, total },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const getTrainingById = async (req: Request, res: Response) => {
  try {
    const training = await Training.findById(req.params.id);
    if (!training) return res.status(404).json({ message: "Training not found" });

    return res.status(200).json({ success: true, data: training });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const updateTraining = async (req: Request, res: Response) => {
  try {
    const training = await Training.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!training) return res.status(404).json({ message: "Training not found" });

    return res.status(200).json({ success: true, data: training });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const deleteTraining = async (req: Request, res: Response) => {
  try {
    const training = await Training.findByIdAndDelete(req.params.id);
    if (!training) return res.status(404).json({ message: "Training not found" });

    return res.status(200).json({ success: true, message: "Training deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};
