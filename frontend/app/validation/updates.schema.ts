import { z } from "zod";
import { objectIdSchema, paginationQuerySchema } from "./common.schema";

export const createUpdateSchema = z.object({
  body: z.object({
    projectId: objectIdSchema,
    authorId: objectIdSchema,
    type: z.enum(["daily", "training", "note"]).optional(),
    date: z.coerce.date(),
    summary: z.string().optional(),
    checklist: z
      .array(
        z.object({
          text: z.string(),
          checked: z.boolean().optional(),
        })
      )
      .optional(),
    nextPlan: z.string().optional(),
    attachments: z.array(objectIdSchema).optional(),
    visibleToClient: z.boolean().optional(),
    meta: z.record(z.string(), z.unknown()).optional(),
  }),
});

export const updateUpdateSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
  body: z
    .object({
      projectId: objectIdSchema.optional(),
      authorId: objectIdSchema.optional(),
      type: z.enum(["daily", "training", "note"]).optional(),
      date: z.coerce.date().optional(),
      summary: z.string().optional(),
      checklist: z
        .array(
          z.object({
            text: z.string(),
            checked: z.boolean().optional(),
          })
        )
        .optional(),
      nextPlan: z.string().optional(),
      attachments: z.array(objectIdSchema).optional(),
      visibleToClient: z.boolean().optional(),
      meta: z.record(z.string(), z.unknown()).optional(),
    })
    .strict(),
});

export const getUpdateByIdSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});

export const listUpdatesSchema = z.object({
  query: paginationQuerySchema,
});

export const deleteUpdateSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});
