import { z } from "zod";
import { objectIdSchema, paginationQuerySchema } from "./common.schema";

export const createProjectSchema = z.object({
  body: z.object({
    _id: z.string(),
    title: z.string(),
    slug: z.string().optional(),
    description: z.string().optional(),
    clientId: objectIdSchema,
    tags: z.array(z.string()).optional(),
    projectType: z.string().optional(),
    priority: z.enum(["low", "medium", "high", "critical"]).optional(),
    estimatedHours: z.number().optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    status: z
      .enum(["planned", "active", "on-hold", "completed", "cancelled"])
      .optional(),
    assignments: z
      .object({
        leadAssignee: objectIdSchema.optional(),
        virtualAssistant: objectIdSchema.optional(),
        freelancers: z.array(objectIdSchema).optional(),
        coders: z.array(objectIdSchema).optional(),
      })
      .optional(),
    links: z
      .object({
        github: z.string().optional(),
        onedrive: z.string().optional(),
        loom: z.string().optional(),
        whatsapp: z.string().optional(),
      })
      .partial()
      .optional(),
    milestones: z
      .array(
        z.object({
          title: z.string(),
          dueDate: z.coerce.date().optional(),
          status: z.string().optional(),
        })
      )
      .optional(),
    lifecycle: z
      .array(
        z.object({
          state: z.string(),
          changedAt: z.coerce.date().optional(),
          by: objectIdSchema.optional(),
        })
      )
      .optional(),
    meta: z.record(z.string(), z.unknown()).optional(),
  }),
});

export const updateProjectSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
  body: z
    .object({
      title: z.string().optional(),
      slug: z.string().optional(),
      description: z.string().optional(),
      clientId: objectIdSchema.optional(),
      tags: z.array(z.string()).optional(),
      projectType: z.string().optional(),
      priority: z.enum(["low", "medium", "high", "critical"]).optional(),
      estimatedHours: z.number().optional(),
      startDate: z.coerce.date().optional(),
      endDate: z.coerce.date().optional(),
      status: z
        .enum(["planned", "active", "on-hold", "completed", "cancelled"])
        .optional(),
      assignments: z
        .object({
          leadAssignee: objectIdSchema.optional(),
          virtualAssistant: objectIdSchema.optional(),
          freelancers: z.array(objectIdSchema).optional(),
          coders: z.array(objectIdSchema).optional(),
        })
        .optional(),
      links: z
        .object({
          github: z.string().optional(),
          onedrive: z.string().optional(),
          loom: z.string().optional(),
          whatsapp: z.string().optional(),
        })
        .partial()
        .optional(),
      milestones: z
        .array(
          z.object({
            title: z.string(),
            dueDate: z.coerce.date().optional(),
            status: z.string().optional(),
          })
        )
        .optional(),
      lifecycle: z
        .array(
          z.object({
            state: z.string(),
            changedAt: z.coerce.date().optional(),
            by: objectIdSchema.optional(),
          })
        )
        .optional(),
      meta: z.record(z.string(), z.unknown()).optional(),
    })
    .strict(),
});

export const getProjectByIdSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});

export const listProjectsSchema = z.object({
  query: paginationQuerySchema,
});

export const deleteProjectSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});
