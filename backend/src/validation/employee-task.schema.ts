// src/validation/employee-task.schema.ts
import { z } from "zod";
import { objectIdSchema, paginationQuerySchema } from "./common.schema";

export const createEmployeeTaskSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    defaultTask: z.boolean().optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    attachments: z.array(z.string()).optional(),
    weight: z.number().optional(),
  }),
});

export const updateEmployeeTaskSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
  body: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      defaultTask: z.boolean().optional(),
      startDate: z.coerce.date().optional(),
      endDate: z.coerce.date().optional(),
      attachments: z.array(z.string()).optional(),
      weight: z.number().optional(),
    })
    .strict(),
});

export const getEmployeeTaskByIdSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});

export const listEmployeeTasksSchema = z.object({
  query: paginationQuerySchema,
});

export const deleteEmployeeTaskSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});
