import { Schema, model } from "mongoose";

const EmployeeSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    type: {
      type: String,
      enum: ["coder", "VA", "core", "lead", "freelancer", "intern"],
      required: true,
    },

    skills: {
      type: [String],
      default: [],
    },

    isActive: {
      type: Boolean,
      ddefault: true,
    }
  },
  { timestamps: true }
);

export const Employee = model("Employee", EmployeeSchema);
export type EmployeeDocument = typeof Employee.prototype;
