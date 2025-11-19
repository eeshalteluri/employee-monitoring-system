"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAudit = exports.updateAudit = exports.getAuditById = exports.getAudits = exports.createAudit = void 0;
const audit_model_1 = require("../models/audit.model");
const createAudit = async (req, res) => {
    try {
        const { body } = req.validated;
        const audit = await audit_model_1.Audit.create(body);
        return res.status(201).json(audit);
    }
    catch (err) {
        console.error("createAudit error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.createAudit = createAudit;
const getAudits = async (req, res) => {
    try {
        const { query } = req.validated || {};
        const page = query?.page || 1;
        const limit = query?.limit || 20;
        const skip = (page - 1) * limit;
        const [items, total] = await Promise.all([
            audit_model_1.Audit.find().skip(skip).limit(limit),
            audit_model_1.Audit.countDocuments(),
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
        console.error("getAudits error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.getAudits = getAudits;
const getAuditById = async (req, res) => {
    try {
        const { params } = req.validated;
        const audit = await audit_model_1.Audit.findById(params.id);
        if (!audit)
            return res.status(404).json({ message: "Audit not found" });
        return res.json(audit);
    }
    catch (err) {
        console.error("getAuditById error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.getAuditById = getAuditById;
const updateAudit = async (req, res) => {
    try {
        const { params, body } = req.validated;
        const audit = await audit_model_1.Audit.findByIdAndUpdate(params.id, body, {
            new: true,
            runValidators: true,
        });
        if (!audit)
            return res.status(404).json({ message: "Audit not found" });
        return res.json(audit);
    }
    catch (err) {
        console.error("updateAudit error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.updateAudit = updateAudit;
const deleteAudit = async (req, res) => {
    try {
        const { params } = req.validated;
        const audit = await audit_model_1.Audit.findByIdAndDelete(params.id);
        if (!audit)
            return res.status(404).json({ message: "Audit not found" });
        return res.status(204).send();
    }
    catch (err) {
        console.error("deleteAudit error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.deleteAudit = deleteAudit;
//# sourceMappingURL=audit.controller.js.map