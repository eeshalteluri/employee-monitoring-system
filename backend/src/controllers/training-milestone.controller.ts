// src/controllers/training-milestone.controller.ts
import { Request, Response } from "express";
import { TrainingMilestone } from "../models/training-milestone.model";

export const createTrainingMilestone = async (req: Request, res: Response) => {
  try {
    const milestone = await TrainingMilestone.create(req.body);
    return res.status(201).json({ success: true, data: milestone });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const getTrainingMilestones = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query as any;

    const milestones = await TrainingMilestone.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("trainingId");

    const total = await TrainingMilestone.countDocuments();

    return res.status(200).json({
      success: true,
      data: milestones,
      pagination: { page, limit, total },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const getTrainingMilestoneById = async (req: Request, res: Response) => {
  try {
    const milestone = await TrainingMilestone.findById(req.params.id).populate("trainingId");
    if (!milestone) return res.status(404).json({ message: "Training milestone not found" });

    return res.status(200).json({ success: true, data: milestone });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const updateTrainingMilestone = async (req: Request, res: Response) => {
  try {
    const milestone = await TrainingMilestone.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("trainingId");

    if (!milestone) return res.status(404).json({ message: "Training milestone not found" });

    return res.status(200).json({ success: true, data: milestone });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const deleteTrainingMilestone = async (req: Request, res: Response) => {
  try {
    const milestone = await TrainingMilestone.findByIdAndDelete(req.params.id);
    if (!milestone) return res.status(404).json({ message: "Training milestone not found" });

    return res.status(200).json({ success: true, message: "Training milestone deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};
