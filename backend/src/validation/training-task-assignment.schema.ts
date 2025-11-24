// src/validation/training-task-assignment.schema.ts
import { z } from "zod";
import { paginationQuerySchema } from "./common.schema";

export const createTrainingTaskAssignmentSchema = z.object({
  body: z.object({
    trainingTaskId: z.string().min(1),
    trainingId: z.string().min(1),
    employeeId: z.string().min(1),
    type: z.enum(["default", "personal"]).optional(),
    assignedAt: z.coerce.date().optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    score: z.number().optional(),
  }),
});

export const updateTrainingTaskAssignmentSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
  body: z
    .object({
      trainingTaskId: z.string().min(1).optional(),
      trainingId: z.string().min(1).optional(),
      employeeId: z.string().min(1).optional(),
      type: z.enum(["default", "personal"]).optional(),
      assignedAt: z.coerce.date().optional(),
      startDate: z.coerce.date().optional(),
      endDate: z.coerce.date().optional(),
      score: z.number().optional(),
    })
    .strict(),
});

export const getTrainingTaskAssignmentByIdSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
});

export const listTrainingTaskAssignmentsSchema = z.object({
  query: paginationQuerySchema,
});

export const deleteTrainingTaskAssignmentSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
});
