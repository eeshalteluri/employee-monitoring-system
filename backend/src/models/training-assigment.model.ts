import { Schema, model } from "mongoose";

const TrainingAssignmentSchema = new Schema(
  {
    trainingId: {
      type: Schema.Types.ObjectId,
      ref: "TrainingModule", // your Training model name
      required: true,
      index: true,
    },

    employeeId: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: ["active", "completed", "dropped"],
      default: "active",
      required: true,
    }
  },
  { timestamps: true }
);

export const TrainingAssignment = model("TrainingAssignment", TrainingAssignmentSchema);
export const TrainingAssignmentDocument = typeof TrainingAssignment.prototype;
