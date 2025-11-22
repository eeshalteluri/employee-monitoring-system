// src/controllers/client.controller.ts
import { Request, Response } from "express";
import { Client } from "../models/client.model";

export const createClient = async (req: Request, res: Response) => {
  try {
    const client = await Client.create(req.body);
    return res.status(201).json({ success: true, data: client });
  } catch (error: any) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const getClients = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query as any;

    const clients = await Client.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("userId");

    const total = await Client.countDocuments();

    return res.status(200).json({
      success: true,
      data: clients,
      pagination: { page, limit, total },
    });
  } catch (error: any) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const getClientById = async (req: Request, res: Response) => {
  try {
    const client = await Client.findById(req.params.id).populate("userId");
    if (!client) return res.status(404).json({ message: "Client not found" });

    return res.status(200).json({ success: true, data: client });
  } catch (error: any) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const updateClient = async (req: Request, res: Response) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!client) return res.status(404).json({ message: "Client not found" });

    return res.status(200).json({ success: true, data: client });
  } catch (error: any) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) return res.status(404).json({ message: "Client not found" });

    return res.status(200).json({ success: true, message: "Client deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};
