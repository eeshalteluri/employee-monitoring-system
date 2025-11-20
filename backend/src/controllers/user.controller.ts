// src/controllers/user.controller.ts
import { Request, Response } from "express";
import {UserModel} from "../models/user.model";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { body } = (req as any).validated;
    const user = await UserModel.create(body);
    return res.status(201).json(user);
  } catch (err: any) {
    console.error("createUser error:", err);
    if (err.code === 11000) {
      return res.status(409).json({ message: "Email already in use" });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const { query } = (req as any).validated || {};
    const page = query?.page || 1;
    const limit = query?.limit || 20;
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      UserModel.find().skip(skip).limit(limit),
      UserModel.countDocuments(),
    ]);

    return res.json({
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("getUsers error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { params } = (req as any).validated;
    const user = await UserModel.findById(params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json(user);
  } catch (err) {
    console.error("getUserById error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { params, body } = (req as any).validated;
    const user = await UserModel.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json(user);
  } catch (err) {
    console.error("updateUser error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { params } = (req as any).validated;
    const user = await UserModel.findByIdAndDelete(params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(204).send();
  } catch (err) {
    console.error("deleteUser error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
