// src/validation/project-milestone.schema.ts
import { z } from "zod";
import { objectIdSchema, paginationQuerySchema } from "./common.schema";

export const createProjectMilestoneSchema = z.object({
  body: z.object({
    projectId: objectIdSchema,
    title: z.string().min(1),
    dueDate: z.coerce.date(),
    status: z.enum(["not_started", "in_progress", "completed", "delayed"]).optional(),
  }),
});

export const updateProjectMilestoneSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
  body: z
    .object({
      projectId: objectIdSchema.optional(),
      title: z.string().optional(),
      dueDate: z.coerce.date().optional(),
      status: z.enum(["not_started", "in_progress", "completed", "delayed"]).optional(),
    })
    .strict(),
});

export const getProjectMilestoneByIdSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});

export const listProjectMilestonesSchema = z.object({
  query: paginationQuerySchema,
});

export const deleteProjectMilestoneSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});
