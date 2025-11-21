import { z } from "zod";
import { objectIdSchema, paginationQuerySchema } from "./common.schema";

export const createAuditSchema = z.object({
  body: z.object({
    collectionName: z.string(),
    documentId: objectIdSchema,
    action: z.enum(["create", "update", "delete"]),
    performedBy: objectIdSchema.optional(),
    timestamp: z.coerce.date().optional(),
    before: z.record(z.string(), z.unknown()).optional(),
    after: z.record(z.string(), z.unknown()).optional(),
    reason: z.string().optional(),
  }),
});

export const updateAuditSchema = z.object({
  params: z.object({ id: objectIdSchema }),
  body: z
    .object({
      collectionName: z.string().optional(),
      documentId: objectIdSchema.optional(),
      action: z.enum(["create", "update", "delete"]).optional(),
      performedBy: objectIdSchema.optional(),
      timestamp: z.coerce.date().optional(),
      before: z.record(z.string(), z.unknown()).optional(),
      after: z.record(z.string(), z.unknown()).optional(),
      reason: z.string().optional(),
    })
    .strict(),
});

export const getAuditByIdSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});

export const listAuditsSchema = z.object({
  query: paginationQuerySchema,
});

export const deleteAuditSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});
