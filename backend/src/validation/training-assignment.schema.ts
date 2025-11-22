// src/validation/training-assignment.schema.ts
import { z } from "zod";
import { objectIdSchema, paginationQuerySchema } from "./common.schema";

export const createTrainingAssignmentSchema = z.object({
  body: z.object({
    trainingId: objectIdSchema,
    employeeId: objectIdSchema,
    status: z.enum(["active", "completed", "dropped"]).optional(),
  }),
});

export const updateTrainingAssignmentSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
  body: z
    .object({
      trainingId: objectIdSchema.optional(),
      employeeId: objectIdSchema.optional(),
      status: z.enum(["active", "completed", "dropped"]).optional(),
    })
    .strict(),
});

export const getTrainingAssignmentByIdSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});

export const listTrainingAssignmentsSchema = z.object({
  query: paginationQuerySchema,
});

export const deleteTrainingAssignmentSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});
