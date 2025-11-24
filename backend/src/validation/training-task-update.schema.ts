// src/validation/training-task-update.schema.ts
import { z } from "zod";
import { paginationQuerySchema } from "./common.schema";

export const createTrainingTaskUpdateSchema = z.object({
  body: z.object({
    trainingTaskAssignmentId: z.string().min(1),
    trainingId: z.string().min(1),
    trainingTaskId: z.string().min(1),
    employeeId: z.string().min(1),
    date: z.coerce.date(),
    status: z.string().optional(),
    isApproved: z.boolean().optional(),
    approvedBy: z.string().optional(),
    notes: z.string().optional(),
    attachments: z.array(z.string()).optional(),
  }),
});

export const updateTrainingTaskUpdateSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
  body: z
    .object({
      trainingTaskAssignmentId: z.string().min(1).optional(),
      trainingId: z.string().min(1).optional(),
      trainingTaskId: z.string().min(1).optional(),
      employeeId: z.string().min(1).optional(),
      date: z.coerce.date().optional(),
      status: z.string().optional(),
      isApproved: z.boolean().optional(),
      approvedBy: z.string().optional(),
      notes: z.string().optional(),
      attachments: z.array(z.string()).optional(),
    })
    .strict(),
});

export const getTrainingTaskUpdateByIdSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
});

export const listTrainingTaskUpdatesSchema = z.object({
  query: paginationQuerySchema,
});

export const deleteTrainingTaskUpdateSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
});
