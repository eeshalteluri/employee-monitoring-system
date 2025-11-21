import { z } from "zod";
import { objectIdSchema, paginationQuerySchema } from "./common.schema";

export const createFileSchema = z.object({
  body: z.object({
    filename: z.string(),
    fileType: z.string().optional(),
    size: z.number().optional(),
    pathKey: z.string().optional(),
    url: z.string().url().optional(),
    uploaderId: objectIdSchema.optional(),
    projectId: objectIdSchema.optional(),
    meta: z.record(z.string(), z.unknown()).optional(),
  }),
});

export const updateFileSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
  body: z
    .object({
      filename: z.string().optional(),
      fileType: z.string().optional(),
      size: z.number().optional(),
      pathKey: z.string().optional(),
      url: z.string().url().optional(),
      uploaderId: objectIdSchema.optional(),
      projectId: objectIdSchema.optional(),
      meta: z.record(z.string(), z.unknown()).optional(),
    })
    .strict(),
});

export const getFileByIdSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});

export const listFilesSchema = z.object({
  query: paginationQuerySchema,
});

export const deleteFileSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});
