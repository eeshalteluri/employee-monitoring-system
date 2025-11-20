import { z } from "zod";
import { objectIdSchema, paginationQuerySchema } from "./common.schema";

export const createClientSchema = z.object({
  body: z.object({
    _id: z.string(),
    name: z.string().min(1),
    type: z.string().optional(),
    contactName: z.string().optional(),
    contactEmail: z.string().optional(),
    contactPhone: z.string().optional(),
    links: z
      .object({
        github: z.string().optional(),
        onedrive: z.string().optional(),
        loom: z.string().optional(),
        whatsapp: z.string().optional(),
      })
      .partial()
      .optional(),
    tags: z.array(z.string()).optional(),
    notes: z.string().optional(),
    createdBy: objectIdSchema.optional(),
  }),
});

export const updateClientSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
  body: z
    .object({
      name: z.string().optional(),
      type: z.string().optional(),
      contactName: z.string().optional(),
      contactEmail: z.string().email().optional(),
      contactPhone: z.string().optional(),
      links: z
        .object({
          github: z.string().url().optional(),
          onedrive: z.string().url().optional(),
          loom: z.string().url().optional(),
          whatsapp: z.string().optional(),
        })
        .partial()
        .optional(),
      tags: z.array(z.string()).optional(),
      notes: z.string().optional(),
      createdBy: objectIdSchema.optional(),
    })
    .strict(),
});

export const getClientByIdSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});

export const listClientsSchema = z.object({
  query: paginationQuerySchema,
});

export const deleteClientSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});
