// src/validation/user.schema.ts
import { z } from "zod";
import { objectIdSchema, paginationQuerySchema } from "./common.schema";

// --------------------------------------
// Base User Fields Schema
// --------------------------------------
const userBaseFields = {
  name: z.string().min(1),
  email: z.string(),
  emailVerified: z.boolean(),
  role: z.enum(["admin", "employee", "client", "applicant"]),
  image: z.string(),                 // now required
  isApproved: z.boolean().optional() // default false in DB
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

      image: z.string().optional(),      // optional for update
      isApproved: z.boolean().optional() // optional on update
    })
    .strict(),
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
