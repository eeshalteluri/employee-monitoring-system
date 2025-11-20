// lib/validation/project-schema.ts
import { z } from "zod";

export const statusOptions = [
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
  "training",
] as const;

export const projectTypeOptions = [
  "client",
  "research",
  "management",
  "training",
] as const;

export const priorityOptions = ["low", "medium", "high"] as const;

export const tagOptions = ["stock"] as const;

export const milestoneSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  dueDate: z.date().optional(),
  isCompleted: z.boolean(),
  completedAt: z.date().optional(),
  assignedTo: z.string().optional().nullable(),
});

export const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  status: z.enum(statusOptions),
  description: z.string().optional(),

  fileLinks: z.array(z.object({ url: z.string("Must be a valid URL") })).optional(),
  githubLinks: z.array(z.object({ url: z.string("Must be a valid URL") })).optional(),
  loomLinks: z.array(z.object({ url: z.string("Must be a valid URL") })).optional(),

  clientId: z.string().optional().nullable(),

  projectType: z.enum(projectTypeOptions).optional().nullable(),
  priority: z.enum(priorityOptions),

  estimatedHoursRequired: z
    .number()
    .nonnegative()
    .optional()
    .or(z.nan().transform(() => undefined)),
  totalHoursTaken: z
    .number()
    .nonnegative()
    .optional()
    .or(z.nan().transform(() => undefined)),

  startDate: z.date().optional(),
  endDate: z.date().optional(),

  isAssigned: z.boolean(),

  assignees: z.array(z.string()).optional(),
  leadAssignee: z.string().optional().nullable(),
  VAIncharge: z.string().optional().nullable(),
  freelancers: z.array(z.string()).optional(),
  updateIncharge: z.string().optional().nullable(),
  codersRecommendation: z.array(z.string()).optional(),
  leadership: z.string().optional().nullable(),

  clientWhatsappGroupLink: z.string().optional().or(z.literal("")),
  teamWhatsappGroupLink: z.string().optional().or(z.literal("")),
  slackGroupLink: z.string().optional().or(z.literal("")),

  clientUpsetOrDidntReply3Days: z.boolean(),

  clientHandling: z.string().optional().nullable(),
  selectedBy: z.string().optional().nullable(),

  askUpdate: z.string().optional(),
  tags: z.array(z.enum(tagOptions)).optional(),

  remarks: z.string().optional(),

  milestones: z.array(milestoneSchema).optional(),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;
export type MilestoneFormValues = z.infer<typeof milestoneSchema>;
