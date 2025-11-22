// src/controllers/project.controller.ts
import { Request, Response } from "express";
import { Project } from "../models/project.model";

export const createProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.create(req.body);
    return res.status(201).json({ success: true, data: project });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const getProjects = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query as any;

    const projects = await Project.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("clientId")
      .populate("leadAssignee")
      .populate("VAInCharge")
      .populate("freelancers")
      .populate("leadership")
      .populate("updateIncharge");

    const total = await Project.countDocuments();

    return res.status(200).json({
      success: true,
      data: projects,
      pagination: { page, limit, total },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("clientId")
      .populate("leadAssignee")
      .populate("VAInCharge")
      .populate("freelancers")
      .populate("leadership")
      .populate("updateIncharge");

    if (!project) return res.status(404).json({ message: "Project not found" });

    return res.status(200).json({ success: true, data: project });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .populate("clientId")
      .populate("leadAssignee")
      .populate("VAInCharge")
      .populate("freelancers")
      .populate("leadership")
      .populate("updateIncharge");

    if (!project) return res.status(404).json({ message: "Project not found" });

    return res.status(200).json({ success: true, data: project });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    return res.status(200).json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};
