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

    isAssigned: { type: Boolean, default: false },

    assignees: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ],

    leadAssignee: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },

    VAIncharge: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },

    freelancers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Freelancer"
      }
    ],

    updateIncharge: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },

    codersRecommendation: [
      {
      type: Schema.Types.ObjectId,
      ref: "User"
      }
    ],

    leadership: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },

    githubLinks: [{ type: String }],
    loomLinks: [{ type: String }],

    clientWhatsappGroupLink: { type: String },
    teamWhatsappGroupLink: { type: String },
    slackGroupLink: { type: String },

    clientUpsetOrDidntReply3Days: { type: Boolean, default: false },

    clientHandling: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },

    selectedBy: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },

    askUpdate: { type: String },
    remarks: { type: String },

    milestones: [
      {
        title: String,
        dueDate: Date,
        status: String,
      },
    ],

        assignedTo: {
          type: Schema.Types.ObjectId,
          ref: "User"
        }
  },
  { timestamps: true }
);

export const Project = model("projects", ProjectSchema);
export type ProjectDocument = typeof Project.prototype;
