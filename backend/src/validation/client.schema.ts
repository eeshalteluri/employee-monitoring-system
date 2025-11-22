// src/validation/client.schema.ts
import { z } from "zod";
import { objectIdSchema, paginationQuerySchema } from "./common.schema";

export const createClientSchema = z.object({
  body: z.object({
    userId: objectIdSchema,
    phone: z.string().optional(),
    type: z.enum(["new", "existing"]).optional(),
    isActive: z.boolean().optional(),
  }),
});

export const updateClientSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
  body: z
    .object({
      phone: z.string().optional(),
      type: z.enum(["new", "existing"]).optional(),
      isActive: z.boolean().optional(),
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
