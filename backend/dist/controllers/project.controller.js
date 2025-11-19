"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.updateProject = exports.getProjectById = exports.getProjects = exports.createProject = void 0;
const project_model_1 = require("../models/project.model");
const createProject = async (req, res) => {
    try {
        const { body } = req.validated;
        const project = await project_model_1.Project.create(body);
        return res.status(201).json(project);
    }
    catch (err) {
        console.error("createProject error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.createProject = createProject;
const getProjects = async (req, res) => {
    try {
        const { query } = req.validated || {};
        const page = query?.page || 1;
        const limit = query?.limit || 20;
        const skip = (page - 1) * limit;
        const [items, total] = await Promise.all([
            project_model_1.Project.find().skip(skip).limit(limit),
            project_model_1.Project.countDocuments(),
        ]);
        return res.json({
            items,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        });
    }
    catch (err) {
        console.error("getProjects error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.getProjects = getProjects;
const getProjectById = async (req, res) => {
    try {
        const { params } = req.validated;
        const project = await project_model_1.Project.findById(params.id);
        if (!project)
            return res.status(404).json({ message: "Project not found" });
        return res.json(project);
    }
    catch (err) {
        console.error("getProjectById error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.getProjectById = getProjectById;
const updateProject = async (req, res) => {
    try {
        const { params, body } = req.validated;
        const project = await project_model_1.Project.findByIdAndUpdate(params.id, body, {
            new: true,
            runValidators: true,
        });
        if (!project)
            return res.status(404).json({ message: "Project not found" });
        return res.json(project);
    }
    catch (err) {
        console.error("updateProject error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.updateProject = updateProject;
const deleteProject = async (req, res) => {
    try {
        const { params } = req.validated;
        const deleted = await project_model_1.Project.findByIdAndDelete(params.id);
        if (!deleted)
            return res.status(404).json({ message: "Project not found" });
        return res.status(204).send();
    }
    catch (err) {
        console.error("deleteProject error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.deleteProject = deleteProject;
//# sourceMappingURL=project.controller.js.map