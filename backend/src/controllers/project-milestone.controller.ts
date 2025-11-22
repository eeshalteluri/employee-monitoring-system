// src/controllers/project-milestone.controller.ts
import { Request, Response } from "express";
import { ProjectMilestone } from "../models/project-milestone.model";

export const createProjectMilestone = async (req: Request, res: Response) => {
  try {
    const milestone = await ProjectMilestone.create(req.body);
    return res.status(201).json({ success: true, data: milestone });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const getProjectMilestones = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query as any;

    const milestones = await ProjectMilestone.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("projectId");

    const total = await ProjectMilestone.countDocuments();

    return res.status(200).json({
      success: true,
      data: milestones,
      pagination: { page, limit, total },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const getProjectMilestoneById = async (req: Request, res: Response) => {
  try {
    const milestone = await ProjectMilestone.findById(req.params.id).populate("projectId");
    if (!milestone) return res.status(404).json({ message: "Project milestone not found" });

    return res.status(200).json({ success: true, data: milestone });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const updateProjectMilestone = async (req: Request, res: Response) => {
  try {
    const milestone = await ProjectMilestone.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("projectId");

    if (!milestone) return res.status(404).json({ message: "Project milestone not found" });

    return res.status(200).json({ success: true, data: milestone });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const deleteProjectMilestone = async (req: Request, res: Response) => {
  try {
    const milestone = await ProjectMilestone.findByIdAndDelete(req.params.id);
    if (!milestone) return res.status(404).json({ message: "Project milestone not found" });

    return res.status(200).json({ success: true, message: "Project milestone deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};
