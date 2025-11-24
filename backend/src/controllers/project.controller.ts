// src/controllers/project.controller.ts
import { Request, Response } from "express";
import { Project } from "../models/project.model";
import { Employee } from "../models/employee.model";

export const createProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.create(req.body);
    return res.status(201).json({ success: true, data: project });
  } catch (error) {
    console.error("createProject error:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const getProjects = async (req: Request, res: Response) => {
  try {
    const {
      page = "1",
      limit = "10",
      search,
      status,
      priority,
      projectType,
      clientId,
      startDate,
      endDate,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query as any;

    console.log("Req query of get projects: ", page,
      limit,
      search,
      status,
      priority,
      projectType,
      clientId,
      startDate,
      endDate,
      sortBy,
      sortOrder,);

    const pageNum = Math.max(parseInt(page, 10) || 1, 1);
    const limitNum = Math.max(parseInt(limit, 10) || 10, 1);

    const filter: any = {};

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    if (status) {
      filter.status = status;
    }

    if (priority) {
      filter.priority = priority;
    }

    if (projectType) {
      filter.projectType = projectType;
    }

    if (clientId) {
      filter.clientId = clientId;
    }

    if (startDate || endDate) {
      filter.startDate = {};
      if (startDate) {
        filter.startDate.$gte = new Date(startDate);
      }
      if (endDate) {
        filter.startDate.$lte = new Date(endDate);
      }
    }

    const sort: any = {};
    sort[sortBy as string] = sortOrder === "asc" ? 1 : -1;

    const [projects, total] = await Promise.all([
      Project.find(filter)
        .sort(sort)
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum)
        .populate("clientId")
        .populate("leadAssignee")
        .populate("VAInCharge")
        .populate("freelancers")
        .populate("leadership")
        .populate("updateIncharge"),
      // If you later change assignees to ObjectId ref, you can also:
      // .populate("assignees"),
      Project.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      data: projects,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error("getProjects error:", error);
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
    console.error("getProjectById error:", error);
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
    console.error("updateProject error:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    return res
      .status(200)
      .json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    console.error("deleteProject error:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};
