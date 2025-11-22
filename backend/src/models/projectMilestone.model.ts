import { Schema, model } from "mongoose";

const ProjectMilestoneSchema = new Schema(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
    },

    dueDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["not_started", "in_progress", "completed", "delayed"],
      default: "not_started",
    },
  },
  { timestamps: true }
);

export const ProjectMilestone = model("ProjectMilestone", ProjectMilestoneSchema);
export const ProjectMilestoneDocument = typeof ProjectMilestone.prototype;
