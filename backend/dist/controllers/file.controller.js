"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = exports.updateFile = exports.getFileById = exports.getFiles = exports.createFile = void 0;
const file_model_1 = require("../models/file.model");
const createFile = async (req, res) => {
    try {
        const { body } = req.validated;
        const file = await file_model_1.FileModel.create(body);
        return res.status(201).json(file);
    }
    catch (err) {
        console.error("createFile error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.createFile = createFile;
const getFiles = async (req, res) => {
    try {
        const { query } = req.validated || {};
        const page = query?.page || 1;
        const limit = query?.limit || 20;
        const skip = (page - 1) * limit;
        const [items, total] = await Promise.all([
            file_model_1.FileModel.find().skip(skip).limit(limit),
            file_model_1.FileModel.countDocuments(),
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
        console.error("getFiles error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.getFiles = getFiles;
const getFileById = async (req, res) => {
    try {
        const { params } = req.validated;
        const file = await file_model_1.FileModel.findById(params.id);
        if (!file)
            return res.status(404).json({ message: "File not found" });
        return res.json(file);
    }
    catch (err) {
        console.error("getFileById error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.getFileById = getFileById;
const updateFile = async (req, res) => {
    try {
        const { params, body } = req.validated;
        const file = await file_model_1.FileModel.findByIdAndUpdate(params.id, body, {
            new: true,
            runValidators: true,
        });
        if (!file)
            return res.status(404).json({ message: "File not found" });
        return res.json(file);
    }
    catch (err) {
        console.error("updateFile error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.updateFile = updateFile;
const deleteFile = async (req, res) => {
    try {
        const { params } = req.validated;
        const file = await file_model_1.FileModel.findByIdAndDelete(params.id);
        if (!file)
            return res.status(404).json({ message: "File not found" });
        return res.status(204).send();
    }
    catch (err) {
        console.error("deleteFile error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.deleteFile = deleteFile;
//# sourceMappingURL=file.controller.js.map