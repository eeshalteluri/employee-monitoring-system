import { Request, Response } from "express";
import { FileModel } from "../models/file.model";

export const createFile = async (req: Request, res: Response) => {
  try {
    const { body } = (req as any).validated;

    const file = await FileModel.create(body);
    return res.status(201).json(file);
  } catch (err) {
    console.error("createFile error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getFiles = async (req: Request, res: Response) => {
  try {
    const { query } = (req as any).validated || {};
    const page = query?.page || 1;
    const limit = query?.limit || 20;
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      FileModel.find().skip(skip).limit(limit),
      FileModel.countDocuments(),
    ]);

    return res.json({
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("getFiles error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getFileById = async (req: Request, res: Response) => {
  try {
    const { params } = (req as any).validated;

    const file = await FileModel.findById(params.id);
    if (!file) return res.status(404).json({ message: "File not found" });

    return res.json(file);
  } catch (err) {
    console.error("getFileById error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateFile = async (req: Request, res: Response) => {
  try {
    const { params, body } = (req as any).validated;

    const file = await FileModel.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });

    if (!file) return res.status(404).json({ message: "File not found" });
    return res.json(file);
  } catch (err) {
    console.error("updateFile error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteFile = async (req: Request, res: Response) => {
  try {
    const { params } = (req as any).validated;

    const file = await FileModel.findByIdAndDelete(params.id);
    if (!file) return res.status(404).json({ message: "File not found" });

    return res.status(204).send();
  } catch (err) {
    console.error("deleteFile error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
