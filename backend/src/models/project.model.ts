import { Schema, model } from "mongoose";

const ProjectSchema = new Schema(
  {
    clientId: {
      type: Schema.Types.ObjectId,
      ref: "Client",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    tags: {
      type: [String],
      default: [],
    },

    projectType: {
      type: String,
      enum: ["consulting", "web", "ai", "marketing"],
      required: true,
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "medium",
    },

    status: {
      type: String,
      enum: ["not_started", "in_progress", "on_hold", "completed", "cancelled"],
      default: "not_started",
    },

    estimatedHours: {
      type: Number,
      default: 0,
    },

    totalHoursTaken: {
      type: Number,
      default: 0,
    },

    startDate: {
      type: Date,
    },

    endDate: {
      type: Date,
    },

    isAssigned: {
      type: Boolean,
      default: false,
    },

    assignees: {
      type: [String], // Change to ObjectId[] if these reference employees
      default: [],
    },

    leadership: {
      type: [Schema.Types.ObjectId],
      ref: "Employee",
      default: [],
    },

    leadAssignee: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    },

    VAInCharge: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    },

    freelancers: {
      type: [Schema.Types.ObjectId],
      ref: "Employee",
      default: [],
    },

    updateIncharge: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    },

    githubLinks: {
      type: [String],
      default: [],
    },

    loomLinks: {
      type: [String],
      default: [],
    },

    fileLinks: {
      type: [String],
      default: [],
    },

    clientWhatsappGroupLink: {
      type: String,
      default: "",
    },

    teamWhatsappGroupLink: {
      type: String,
      default: "",
    },

    slackGroupLink: {
      type: String,
      default: "",
    },

    clientUpsetOrDidntReply3Days: {
      type: Boolean,
      default: false,
    },

    clientHandling: {
      type: String,
      default: "",
    },

    remarks: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default model("Project", ProjectSchema);
