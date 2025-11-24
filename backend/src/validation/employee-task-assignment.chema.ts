// src/validation/employee-task-assignment.schema.ts
import { z } from "zod";
import { objectIdSchema, paginationQuerySchema } from "./common.schema";

export const createEmployeeTaskAssignmentSchema = z.object({
  body: z.object({
    employeeTaskId: z.string().min(1),
    employeeId: z.string().min(1),
    type: z.enum(["default", "personal"]).optional(),
    assignedAt: z.coerce.date().optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    score: z.number().optional(),
  }),
});

export const updateEmployeeTaskAssignmentSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
  body: z
    .object({
      employeeTaskId: z.string().min(1).optional(),
      employeeId: z.string().min(1).optional(),
      type: z.enum(["default", "personal"]).optional(),
      assignedAt: z.coerce.date().optional(),
      startDate: z.coerce.date().optional(),
      endDate: z.coerce.date().optional(),
      score: z.number().optional(),
    })
    .strict(),
});

export const getEmployeeTaskAssignmentByIdSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
});

export const listEmployeeTaskAssignmentsSchema = z.object({
  query: paginationQuerySchema,
});

export const deleteEmployeeTaskAssignmentSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
});
