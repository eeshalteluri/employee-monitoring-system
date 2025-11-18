import { Request, Response } from "express";
import { Update } from "../models/updates.model";

export const createUpdate = async (req: Request, res: Response) => {
  try {
    const { body } = (req as any).validated;

    const item = await Update.create(body);
    return res.status(201).json(item);
  } catch (err) {
    console.error("createUpdate error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUpdates = async (req: Request, res: Response) => {
  try {
    const { query } = (req as any).validated || {};
    const page = query?.page || 1;
    const limit = query?.limit || 20;
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Update.find().skip(skip).limit(limit),
      Update.countDocuments(),
    ]);

    return res.json({
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("getUpdates error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUpdateById = async (req: Request, res: Response) => {
  try {
    const { params } = (req as any).validated;

    const item = await Update.findById(params.id);
    if (!item) return res.status(404).json({ message: "Update not found" });

    return res.json(item);
  } catch (err) {
    console.error("getUpdateById error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUpdate = async (req: Request, res: Response) => {
  try {
    const { params, body } = (req as any).validated;

    const item = await Update.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });

    if (!item) return res.status(404).json({ message: "Update not found" });
    return res.json(item);
  } catch (err) {
    console.error("updateUpdate error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUpdate = async (req: Request, res: Response) => {
  try {
    const { params } = (req as any).validated;

    const deleted = await Update.findByIdAndDelete(params.id);
    if (!deleted) return res.status(404).json({ message: "Update not found" });

    return res.status(204).send();
  } catch (err) {
    console.error("deleteUpdate error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
