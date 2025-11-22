// src/validation/freelancer.schema.ts
import { z } from "zod";
import { objectIdSchema, paginationQuerySchema } from "./common.schema";

export const createFreelancerSchema = z.object({
  body: z.object({
    userId: objectIdSchema,
    employeeId: objectIdSchema,
    country: z.string().optional(),
    timezone: z.string().optional(),
    hourlyRate: z.number().optional(),
    availabilityHoursPerWeek: z.number().optional(),
    portfolioLink: z.string().url().optional(),
    freelanceProfile: z.string().url().optional(),
    experienceLevel: z.enum(["beginner", "intermediate", "expert"]).optional(),
    isActive: z.boolean().optional(),
    assignedProjects: z.array(objectIdSchema).optional(),
    rating: z.number().min(1).max(5).optional(),
    paymentMethod: z.string().optional(),
    paymentEmail: z.string().email().optional(),
    currency: z.string().optional(),
  }),
});

export const updateFreelancerSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
  body: z
    .object({
      country: z.string().optional(),
      timezone: z.string().optional(),
      hourlyRate: z.number().optional(),
      availabilityHoursPerWeek: z.number().optional(),
      portfolioLink: z.string().url().optional(),
      freelanceProfile: z.string().url().optional(),
      experienceLevel: z.enum(["beginner", "intermediate", "expert"]).optional(),
      isActive: z.boolean().optional(),
      assignedProjects: z.array(objectIdSchema).optional(),
      rating: z.number().min(1).max(5).optional(),
      paymentMethod: z.string().optional(),
      paymentEmail: z.string().email().optional(),
      currency: z.string().optional(),
    })
    .strict(),
});

export const getFreelancerByIdSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});

export const listFreelancersSchema = z.object({
  query: paginationQuerySchema,
});

export const deleteFreelancerSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});
