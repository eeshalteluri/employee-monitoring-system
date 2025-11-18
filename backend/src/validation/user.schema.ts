// src/validation/user.schema.ts
import { z } from "zod";
import { objectIdSchema, paginationQuerySchema } from "./common.schema";

// --------------------------------------
// Base User Fields Schema
// --------------------------------------
const userBaseFields = {
  name: z.string().min(1),
  email: z.string().email(),
  emailVerified: z.boolean().default(false),
  role: z.enum(["admin", "employee", "client", "applicant"]),
  phone: z.string().optional(),
  image: z.string().url().optional(),

  // Zod v4: record(valueType)
  metadata: z.record(z.string(), z.unknown()).optional(),

  isActive: z.boolean().optional(),
  assignedClientIds: z.array(objectIdSchema).optional(),
};

// --------------------------------------
// CREATE USER
// --------------------------------------
export const createUserSchema = z.object({
  body: z
    .object({
      ...userBaseFields,
    })
    .strict(),
});

// --------------------------------------
// UPDATE USER
// --------------------------------------
export const updateUserSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
  body: z
    .object({
      name: z.string().min(1).optional(),
      email: z.string().email().optional(),
      emailVerified: z.boolean().optional(),
      role: z.enum(["admin", "employee", "client", "applicant"]).optional(),
      phone: z.string().optional(),
      image: z.string().url().optional(),

      // Zod v4: record(valueType)
      metadata: z.record(z.string(), z.unknown()).optional(),

      isActive: z.boolean().optional(),
      assignedClientIds: z.array(objectIdSchema).optional(),
    })
    .strict(), // disallow extra fields in update
});

// --------------------------------------
// GET USER BY ID
// --------------------------------------
export const getUserByIdSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});

// --------------------------------------
// LIST USERS
// --------------------------------------
export const listUsersSchema = z.object({
  query: paginationQuerySchema.strict(),
});

// --------------------------------------
// DELETE USER
// --------------------------------------
export const deleteUserSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});
