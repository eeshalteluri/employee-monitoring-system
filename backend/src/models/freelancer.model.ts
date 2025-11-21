import mongoose, { model, Schema } from "mongoose";

const FreelancerSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    employeeId: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
      index: true,
    },

    country: { type: String },
    timezone: { type: String },

    hourlyRate: { type: Number },
    availabilityHoursPerWeek: { type: Number },

    portfolioLink: { type: String },
    freelanceProfile: { type: String }, // changed from upworkProfile

    experienceLevel: {
      type: String,
      enum: ["beginner", "intermediate", "expert"],
      default: "intermediate",
    },

    isActive: { type: Boolean, default: false },

    assignedProjects: [{ type: Schema.Types.ObjectId, ref: "Project" }],

    rating: { type: Number, min: 1, max: 5 },

    paymentMethod: { type: String },
    paymentEmail: { type: String },
    currency: { type: String }
  },
  { timestamps: true }
);

export const Freelancer = model("Freelancer", FreelancerSchema);
export type FreelancerDocument = typeof Freelancer.prototype;
