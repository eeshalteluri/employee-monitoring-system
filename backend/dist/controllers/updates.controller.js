"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUpdate = exports.updateUpdate = exports.getUpdateById = exports.getUpdates = exports.createUpdate = void 0;
const updates_model_1 = require("../models/updates.model");
const createUpdate = async (req, res) => {
    try {
        const { body } = req.validated;
        const item = await updates_model_1.Update.create(body);
        return res.status(201).json(item);
    }
    catch (err) {
        console.error("createUpdate error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.createUpdate = createUpdate;
const getUpdates = async (req, res) => {
    try {
        const { query } = req.validated || {};
        const page = query?.page || 1;
        const limit = query?.limit || 20;
        const skip = (page - 1) * limit;
        const [items, total] = await Promise.all([
            updates_model_1.Update.find().skip(skip).limit(limit),
            updates_model_1.Update.countDocuments(),
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
        console.error("getUpdates error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.getUpdates = getUpdates;
const getUpdateById = async (req, res) => {
    try {
        const { params } = req.validated;
        const item = await updates_model_1.Update.findById(params.id);
        if (!item)
            return res.status(404).json({ message: "Update not found" });
        return res.json(item);
    }
    catch (err) {
        console.error("getUpdateById error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.getUpdateById = getUpdateById;
const updateUpdate = async (req, res) => {
    try {
        const { params, body } = req.validated;
        const item = await updates_model_1.Update.findByIdAndUpdate(params.id, body, {
            new: true,
            runValidators: true,
        });
        if (!item)
            return res.status(404).json({ message: "Update not found" });
        return res.json(item);
    }
    catch (err) {
        console.error("updateUpdate error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.updateUpdate = updateUpdate;
const deleteUpdate = async (req, res) => {
    try {
        const { params } = req.validated;
        const deleted = await updates_model_1.Update.findByIdAndDelete(params.id);
        if (!deleted)
            return res.status(404).json({ message: "Update not found" });
        return res.status(204).send();
    }
    catch (err) {
        console.error("deleteUpdate error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.deleteUpdate = deleteUpdate;
//# sourceMappingURL=updates.controller.js.map