import { Schema, model } from "mongoose";

const TrainingModuleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    type: {
      type: String,
      default: "",
    },

    domain: {
      type: String,
      default: "",
    },

    tags: {
      type: [String],
      default: [],
    },

    startDate: {
      type: Date,
    },

    endDate: {
      type: Date,
    },

    status: {
      type: String,
      enum: ["draft", "ongoing", "completed"],
      default: "draft",
    },
  },
  { timestamps: true }
);

export default model("TrainingModule", TrainingModuleSchema);
