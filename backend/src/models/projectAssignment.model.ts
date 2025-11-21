import { Schema, model } from "mongoose";

const ProjectAssignmentSchema = new Schema(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      index: true,
    },

    employeeId: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
      index: true,
    },

    role: {
      type: String,
      enum: ["lead", "coder", "core", "va", "freelancer"],
      required: true,
    },
  },
  { timestamps: true }
);

export default model("ProjectAssignment", ProjectAssignmentSchema);
