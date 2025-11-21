import { Schema, model } from "mongoose";

const TrainingMilestoneSchema = new Schema(
  {
    trainingId: {
      type: Schema.Types.ObjectId,
      ref: "Training", // or "Training" depending on your model name
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

    dueDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export default model("TrainingMilestone", TrainingMilestoneSchema);
