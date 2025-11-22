// src/validation/project.schema.ts
import { z } from "zod";
import { objectIdSchema, paginationQuerySchema } from "./common.schema";

export const createProjectSchema = z.object({
  body: z.object({
    clientId: objectIdSchema,
    title: z.string().min(1),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    projectType: z.enum(["consulting", "web", "ai", "marketing"]),
    priority: z.enum(["low", "medium", "high", "critical"]).optional(),
    status: z.enum(["not_started", "in_progress", "on_hold", "completed", "cancelled"]).optional(),
    estimatedHours: z.number().optional(),
    totalHoursTaken: z.number().optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    isAssigned: z.boolean().optional(),
    assignees: z.array(z.string()).optional(), // still string IDs based on model
    leadership: z.array(objectIdSchema).optional(),
    leadAssignee: objectIdSchema.optional(),
    VAInCharge: objectIdSchema.optional(),
    freelancers: z.array(objectIdSchema).optional(),
    updateIncharge: objectIdSchema.optional(),
    githubLinks: z.array(z.string().url()).optional(),
    loomLinks: z.array(z.string().url()).optional(),
    fileLinks: z.array(z.string()).optional(),
    clientWhatsappGroupLink: z.string().optional(),
    teamWhatsappGroupLink: z.string().optional(),
    slackGroupLink: z.string().optional(),
    clientUpsetOrDidntReply3Days: z.boolean().optional(),
    clientHandling: z.string().optional(),
    remarks: z.string().optional(),
  }),
});

export const updateProjectSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
  body: z
    .object({
      clientId: objectIdSchema.optional(),
      title: z.string().optional(),
      description: z.string().optional(),
      tags: z.array(z.string()).optional(),
      projectType: z.enum(["consulting", "web", "ai", "marketing"]).optional(),
      priority: z.enum(["low", "medium", "high", "critical"]).optional(),
      status: z.enum(["not_started", "in_progress", "on_hold", "completed", "cancelled"]).optional(),
      estimatedHours: z.number().optional(),
      totalHoursTaken: z.number().optional(),
      startDate: z.coerce.date().optional(),
      endDate: z.coerce.date().optional(),
      isAssigned: z.boolean().optional(),
      assignees: z.array(z.string()).optional(),
      leadership: z.array(objectIdSchema).optional(),
      leadAssignee: objectIdSchema.optional(),
      VAInCharge: objectIdSchema.optional(),
      freelancers: z.array(objectIdSchema).optional(),
      updateIncharge: objectIdSchema.optional(),
      githubLinks: z.array(z.string().url()).optional(),
      loomLinks: z.array(z.string().url()).optional(),
      fileLinks: z.array(z.string()).optional(),
      clientWhatsappGroupLink: z.string().optional(),
      teamWhatsappGroupLink: z.string().optional(),
      slackGroupLink: z.string().optional(),
      clientUpsetOrDidntReply3Days: z.boolean().optional(),
      clientHandling: z.string().optional(),
      remarks: z.string().optional(),
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
