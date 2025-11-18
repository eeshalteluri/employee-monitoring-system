import { Request, Response } from "express";
import { Client } from "../models/client.model";

export const createClient = async (req: Request, res: Response) => {
  try {
    const { body } = (req as any).validated;

    const client = await Client.create(body);
    return res.status(201).json(client);
  } catch (err) {
    console.error("createClient error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getClients = async (req: Request, res: Response) => {
  try {
    const { query } = (req as any).validated || {};
    const page = query?.page || 1;
    const limit = query?.limit || 20;
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Client.find().skip(skip).limit(limit),
      Client.countDocuments(),
    ]);

    return res.json({
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("getClients error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getClientById = async (req: Request, res: Response) => {
  try {
    const { params } = (req as any).validated;
    const item = await Client.findById(params.id);
    if (!item) return res.status(404).json({ message: "Client not found" });

    return res.json(item);
  } catch (err) {
    console.error("getClientById error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateClient = async (req: Request, res: Response) => {
  try {
    const { params, body } = (req as any).validated;

    const item = await Client.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });

    if (!item) return res.status(404).json({ message: "Client not found" });
    return res.json(item);
  } catch (err) {
    console.error("updateClient error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  try {
    const { params } = (req as any).validated;

    const deleted = await Client.findByIdAndDelete(params.id);
    if (!deleted) return res.status(404).json({ message: "Client not found" });

    return res.status(204).send();
  } catch (err) {
    console.error("deleteClient error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
