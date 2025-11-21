import { Request, Response } from "express";
import { Project } from "../models/project.model";

export const createProject = async (req: Request, res: Response) => {
  try {
    const { body } = (req as any).validated;

    const project = await Project.create(body);
    return res.status(201).json(project);
  } catch (err) {
    console.error("createProject error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getProjects = async (req: Request, res: Response) => {
  try {
    const user = req.user as any;
    const role = user.role;
    const userId = user.id;

    const { query } = (req as any).validated || {};
    const page = query?.page || 1;
    const limit = query?.limit || 20;
    const skip = (page - 1) * limit;

    // ------- ROLE BASED QUERY -------
    let filter: any = {};

    if (role === "admin") {
      filter = {}; // admin sees all
    }

    else if (role === "employee") {
      filter = {
        $or: [
          { assignees: userId },
          { leadAssignee: userId },
          { VAIncharge: userId },
          { updateIncharge: userId },
          { leadership: userId },
          { codersRecommendation: userId }
        ]
      };
    }

    else if (role === "client") {
      filter = { clientId: userId };
    }

    else {
      return res.status(403).json({ message: "Unauthorized role" });
    }

    console.log("User Role: ", role);
    console.log("Filter data: ", filter);

    // ------- DB QUERY -------
    const [items, total] = await Promise.all([
      Project.find(filter)
        .skip(skip)
        .limit(limit)
        .populate("assignees", "name email")
        .populate("leadAssignee", "name email")
        .populate("clientId", "name email companyName"),
      Project.countDocuments(filter),
    ]);

    console.log("Projects: ", items);
    
    return res.json({
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("getProjects error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const getProjectById = async (req: Request, res: Response) => {
  try {
    const { params } = (req as any).validated;

    console.log("Params: ", params);

    const project = await Project.findById(params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    return res.status(200).json(project);
  } catch (err) {
    console.error("getProjectById error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const { params, body } = (req as any).validated;

    const project = await Project.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });

    if (!project) return res.status(404).json({ message: "Project not found" });
    return res.json(project);
  } catch (err) {
    console.error("updateProject error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { params } = (req as any).validated;

    const deleted = await Project.findByIdAndDelete(params.id);
    if (!deleted) return res.status(404).json({ message: "Project not found" });

    return res.status(204).send();
  } catch (err) {
    console.error("deleteProject error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
