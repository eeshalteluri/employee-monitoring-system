// src/validation/employee.schema.ts
import { z } from "zod";
import { objectIdSchema, paginationQuerySchema } from "./common.schema";

export const createEmployeeSchema = z.object({
  body: z.object({
    userId: objectIdSchema,
    type: z.enum(["coder", "VA", "core", "lead", "freelancer", "intern"]),
    skills: z.array(z.string()).optional(),
    isActive: z.boolean().optional(),
  }),
});

export const updateEmployeeSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
  body: z
    .object({
      type: z.enum(["coder", "VA", "core", "lead", "freelancer", "intern"]).optional(),
      skills: z.array(z.string()).optional(),
      isActive: z.boolean().optional(),
    })
    .strict(),
});

export const getEmployeeByIdSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});

export const listEmployeesSchema = z.object({
  query: paginationQuerySchema,
});

export const deleteEmployeeSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});
