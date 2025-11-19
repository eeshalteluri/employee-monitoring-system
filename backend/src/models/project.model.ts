import { Schema, model } from "mongoose";

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true },

    slug: { type: String, index: true },

    description: { type: String },

    clientId: { type: Schema.Types.ObjectId, ref: "clients", required: true },

    tags: [String],

    projectType: String,

    priority: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "medium",
    },

    estimatedHours: Number,

    startDate: Date,
    endDate: Date,

    status: {
      type: String,
      enum: ["planned", "active", "on-hold", "completed", "cancelled"],
      default: "planned",
    },

    assignments: {
      leadAssignee: { type: Schema.Types.ObjectId, ref: "users" },
      virtualAssistant: { type: Schema.Types.ObjectId, ref: "users" },
      freelancers: [{ type: Schema.Types.ObjectId, ref: "users" }],
      coders: [{ type: Schema.Types.ObjectId, ref: "users" }],
    },

    links: {
      github: String,
      onedrive: String,
      loom: String,
      whatsapp: String,
    },

    milestones: [
      {
        title: String,
        dueDate: Date,
        status: String,
      },
    ],

    lifecycle: [
      {
        state: String,
        changedAt: Date,
        by: { type: Schema.Types.ObjectId, ref: "users" },
      },
    ],

    meta: { type: Object },
  },
  { timestamps: true }
);

export const Project = model("projects", ProjectSchema);
export type ProjectDocument = typeof Project.prototype;
