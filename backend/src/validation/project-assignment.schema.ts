// src/validation/project-assignment.schema.ts
import { z } from "zod";
import { objectIdSchema, paginationQuerySchema } from "./common.schema";

export const createProjectAssignmentSchema = z.object({
  body: z.object({
    projectId: objectIdSchema,
    employeeId: objectIdSchema,
    role: z.enum(["lead", "coder", "core", "va", "freelancer"]),
  }),
});

export const updateProjectAssignmentSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
  body: z
    .object({
      projectId: objectIdSchema.optional(),
      employeeId: objectIdSchema.optional(),
      role: z.enum(["lead", "coder", "core", "va", "freelancer"]).optional(),
    })
    .strict(),
});

export const getProjectAssignmentByIdSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});

export const listProjectAssignmentsSchema = z.object({
  query: paginationQuerySchema,
});

export const deleteProjectAssignmentSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});
