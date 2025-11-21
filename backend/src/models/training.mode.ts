import { Schema, model } from "mongoose";

const TrainingSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,

    type: {
      type: String,
      enum: ["online", "offline", "hybrid"],
      default: "online",
    },

    domain: String,

    tags: [String],

    startDate: Date,
    endDate: Date,

    status: {
      type: String,
      enum: ["planned", "active", "completed", "cancelled"],
      default: "planned",
    },

    milestones: [
      {
        title: String,
        description: String,
        dueDate: Date,
      },
    ],
  },
  { timestamps: true }
);

export const TrainingModel = model("Training", TrainingSchema);
