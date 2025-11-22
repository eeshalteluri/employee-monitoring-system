// src/controllers/freelancer.controller.ts
import { Request, Response } from "express";
import { Freelancer } from "../models/freelancer.model";

export const createFreelancer = async (req: Request, res: Response) => {
  try {
    const freelancer = await Freelancer.create(req.body);
    return res.status(201).json({ success: true, data: freelancer });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const getFreelancers = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query as any;

    const freelancers = await Freelancer.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("userId")
      .populate("employeeId")
      .populate("assignedProjects");

    const total = await Freelancer.countDocuments();

    return res.status(200).json({
      success: true,
      data: freelancers,
      pagination: { page, limit, total },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const getFreelancerById = async (req: Request, res: Response) => {
  try {
    const freelancer = await Freelancer.findById(req.params.id)
      .populate("userId")
      .populate("employeeId")
      .populate("assignedProjects");

    if (!freelancer) return res.status(404).json({ message: "Freelancer not found" });

    return res.status(200).json({ success: true, data: freelancer });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const updateFreelancer = async (req: Request, res: Response) => {
  try {
    const freelancer = await Freelancer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .populate("userId")
      .populate("employeeId")
      .populate("assignedProjects");

    if (!freelancer) return res.status(404).json({ message: "Freelancer not found" });

    return res.status(200).json({ success: true, data: freelancer });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const deleteFreelancer = async (req: Request, res: Response) => {
  try {
    const freelancer = await Freelancer.findByIdAndDelete(req.params.id);
    if (!freelancer) return res.status(404).json({ message: "Freelancer not found" });

    return res.status(200).json({ success: true, message: "Freelancer deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};
