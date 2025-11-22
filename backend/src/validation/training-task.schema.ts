// src/validation/training-task.schema.ts
import { z } from "zod";
import { paginationQuerySchema } from "./common.schema";

export const createTrainingTaskSchema = z.object({
  body: z.object({
    trainingId: z.string().min(1),
    title: z.string().min(1),
    description: z.string().optional(),
    defaultTask: z.boolean().optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    attachments: z.array(z.string()).optional(),
    weight: z.number().optional(),
  }),
});

export const updateTrainingTaskSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
  body: z
    .object({
      trainingId: z.string().min(1).optional(),
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

export const getTrainingTaskByIdSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
});

export const listTrainingTasksSchema = z.object({
  query: paginationQuerySchema,
});

export const deleteTrainingTaskSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
});
