import { z } from "zod";
import { objectIdSchema, paginationQuerySchema } from "./common.schema";

export const createProjectSchema = z.object({
  body: z.object({
    title: z.string(),

    description: z.string().optional(),

    clientId: objectIdSchema.optional(),

    projectType: z.enum(["client", "research", "management", "training"]).optional(),

    priority: z.enum(["low", "medium", "high"]).optional(),

    status: z.enum([
      "completed",
      "cancelled",
      "client",
      "meeting done",
      "contact made",
      "active",
      "recontacted",
      "stalled",
      "requirements sent",
      "waiting for requirement",
      "awaiting testimonial",
      "training"
    ]).optional(),

    estimatedHoursRequired: z.number().optional(),
    totalHoursTaken: z.number().optional(),

    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),

    isAssigned: z.boolean().optional(),

    // --- EMPLOYEE / FREELANCER RELATIONS ---
    assignees: z.array(objectIdSchema).optional(),

    leadAssignee: objectIdSchema.optional(),
    VAIncharge: objectIdSchema.optional(),
    updateIncharge: objectIdSchema.optional(),
    codersRecommendation: objectIdSchema.optional(),
    leadership: objectIdSchema.optional(),
    clientHandling: objectIdSchema.optional(),
    selectedBy: objectIdSchema.optional(),

    freelancers: z.array(objectIdSchema).optional(),

    // --- LINKS ---
    githubLinks: z.array(z.string().url()).optional(),
    loomLinks: z.array(z.string().url()).optional(),
    fileLinks: z.array(z.string()).optional(),

    clientWhatsappGroupLink: z.string().optional(),
    teamWhatsappGroupLink: z.string().optional(),
    slackGroupLink: z.string().optional(),

    clientUpsetOrDidntReply3Days: z.boolean().optional(),

    askUpdate: z.string().optional(),

    tags: z.array(z.enum(["stock"])).optional(),

    remarks: z.string().optional(),

    // --- MILESTONES ---
    milestones: z.array(
      z.object({
        title: z.string(),
        description: z.string().optional(),
        dueDate: z.coerce.date().optional(),
        isCompleted: z.boolean().optional(),
        completedAt: z.coerce.date().optional(),
        assignedTo: objectIdSchema.optional(),
      })
    ).optional(),
  }),
});


export const updateProjectSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),

    clientId: objectIdSchema.optional(),

    projectType: z.enum(["client", "research", "management", "training"]).optional(),

    priority: z.enum(["low", "medium", "high"]).optional(),

    status: z.enum([
      "completed",
      "cancelled",
      "client",
      "meeting done",
      "contact made",
      "active",
      "recontacted",
      "stalled",
      "requirements sent",
      "waiting for requirement",
      "awaiting testimonial",
      "training"
    ]).optional(),

    estimatedHoursRequired: z.number().optional(),
    totalHoursTaken: z.number().optional(),

    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),

    isAssigned: z.boolean().optional(),

    assignees: z.array(objectIdSchema).optional(),

    leadAssignee: objectIdSchema.optional(),
    VAIncharge: objectIdSchema.optional(),
    updateIncharge: objectIdSchema.optional(),
    codersRecommendation: objectIdSchema.optional(),
    leadership: objectIdSchema.optional(),
    clientHandling: objectIdSchema.optional(),
    selectedBy: objectIdSchema.optional(),

    freelancers: z.array(objectIdSchema).optional(),

    githubLinks: z.array(z.string()).optional(),
    loomLinks: z.array(z.string()).optional(),
    fileLinks: z.array(z.string()).optional(),

    clientWhatsappGroupLink: z.string().optional(),
    teamWhatsappGroupLink: z.string().optional(),
    slackGroupLink: z.string().optional(),

    clientUpsetOrDidntReply3Days: z.boolean().optional(),

    askUpdate: z.string().optional(),

    tags: z.array(z.enum(["stock"])).optional(),

    remarks: z.string().optional(),

    milestones: z.array(
      z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        dueDate: z.coerce.date().optional(),
        isCompleted: z.boolean().optional(),
        completedAt: z.coerce.date().optional(),
        assignedTo: objectIdSchema.optional(),
      })
    ).optional(),
  }).strict(),
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
