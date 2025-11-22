// src/validation/employee-task-update.schema.ts
import { z } from "zod";
import { objectIdSchema, paginationQuerySchema } from "./common.schema";

export const createEmployeeTaskUpdateSchema = z.object({
  body: z.object({
    id: z.string().min(1), // required, unique
    employeeTaskAssignmentId: z.string().min(1),
    employeeId: z.string().min(1),
    employeeTaskId: z.string().min(1),
    date: z.coerce.date(),
    status: z.string().optional(),
    isApproved: z.boolean().optional(),
    approvedBy: z.string().optional(),
    notes: z.string().optional(),
    attachments: z.array(z.string()).optional(),
  }),
});

export const updateEmployeeTaskUpdateSchema = z.object({
  params: z.object({
    id: z.string().min(1), // using custom string id, not *ObjectId*
  }),
  body: z
    .object({
      employeeTaskAssignmentId: z.string().min(1).optional(),
      employeeId: z.string().min(1).optional(),
      employeeTaskId: z.string().min(1).optional(),
      date: z.coerce.date().optional(),
      status: z.string().optional(),
      isApproved: z.boolean().optional(),
      approvedBy: z.string().optional(),
      notes: z.string().optional(),
      attachments: z.array(z.string()).optional(),
    })
    .strict(),
});

export const getEmployeeTaskUpdateByIdSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
});

export const listEmployeeTaskUpdatesSchema = z.object({
  query: paginationQuerySchema,
});

export const deleteEmployeeTaskUpdateSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
});
