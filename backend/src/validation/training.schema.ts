// src/validation/training.schema.ts
import { z } from "zod";
import { objectIdSchema, paginationQuerySchema } from "./common.schema";

export const createTrainingSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    type: z.string().optional(),
    domain: z.string().optional(),
    tags: z.array(z.string()).optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    status: z.enum(["draft", "ongoing", "completed"]).optional(),
  }),
});

export const updateTrainingSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
  body: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      type: z.string().optional(),
      domain: z.string().optional(),
      tags: z.array(z.string()).optional(),
      startDate: z.coerce.date().optional(),
      endDate: z.coerce.date().optional(),
      status: z.enum(["draft", "ongoing", "completed"]).optional(),
    })
    .strict(),
});

export const getTrainingByIdSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});

export const listTrainingsSchema = z.object({
  query: paginationQuerySchema,
});

export const deleteTrainingSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});
