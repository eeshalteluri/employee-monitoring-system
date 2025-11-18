import { Request, Response } from "express";
import { Audit } from "../models/audit.model";

export const createAudit = async (req: Request, res: Response) => {
  try {
    const { body } = (req as any).validated;

    const audit = await Audit.create(body);
    return res.status(201).json(audit);
  } catch (err) {
    console.error("createAudit error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAudits = async (req: Request, res: Response) => {
  try {
    const { query } = (req as any).validated || {};
    const page = query?.page || 1;
    const limit = query?.limit || 20;
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Audit.find().skip(skip).limit(limit),
      Audit.countDocuments(),
    ]);

    return res.json({
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("getAudits error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAuditById = async (req: Request, res: Response) => {
  try {
    const { params } = (req as any).validated;

    const audit = await Audit.findById(params.id);
    if (!audit) return res.status(404).json({ message: "Audit not found" });

    return res.json(audit);
  } catch (err) {
    console.error("getAuditById error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateAudit = async (req: Request, res: Response) => {
  try {
    const { params, body } = (req as any).validated;

    const audit = await Audit.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });

    if (!audit) return res.status(404).json({ message: "Audit not found" });
    return res.json(audit);
  } catch (err) {
    console.error("updateAudit error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteAudit = async (req: Request, res: Response) => {
  try {
    const { params } = (req as any).validated;

    const audit = await Audit.findByIdAndDelete(params.id);
    if (!audit) return res.status(404).json({ message: "Audit not found" });

    return res.status(204).send();
  } catch (err) {
    console.error("deleteAudit error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
