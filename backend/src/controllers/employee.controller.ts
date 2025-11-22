// src/controllers/employee.controller.ts
import { Request, Response } from "express";
import { Employee } from "../models/employee.model";

export const createEmployee = async (req: Request, res: Response) => {
  try {
    const employee = await Employee.create(req.body);
    return res.status(201).json({ success: true, data: employee });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const getEmployees = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query as any;

    const employees = await Employee.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("userId");

    const total = await Employee.countDocuments();

    return res.status(200).json({
      success: true,
      data: employees,
      pagination: { page, limit, total },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const getEmployeeById = async (req: Request, res: Response) => {
  try {
    const employee = await Employee.findById(req.params.id).populate("userId");
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    return res.status(200).json({ success: true, data: employee });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    return res.status(200).json({ success: true, data: employee });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    return res.status(200).json({ success: true, message: "Employee deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};
