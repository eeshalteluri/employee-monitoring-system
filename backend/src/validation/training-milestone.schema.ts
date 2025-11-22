// src/validation/training-milestone.schema.ts
import { z } from "zod";
import { objectIdSchema, paginationQuerySchema } from "./common.schema";

export const createTrainingMilestoneSchema = z.object({
  body: z.object({
    trainingId: objectIdSchema,
    title: z.string().min(1),
    description: z.string().optional(),
    dueDate: z.coerce.date(),
  }),
});

export const updateTrainingMilestoneSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
  body: z
    .object({
      trainingId: objectIdSchema.optional(),
      title: z.string().optional(),
      description: z.string().optional(),
      dueDate: z.coerce.date().optional(),
    })
    .strict(),
});

export const getTrainingMilestoneByIdSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});

export const listTrainingMilestonesSchema = z.object({
  query: paginationQuerySchema,
});

export const deleteTrainingMilestoneSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});
