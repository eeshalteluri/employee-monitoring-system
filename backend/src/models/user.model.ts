import { Schema, model } from "mongoose";
import type { IUser } from "../types/user";

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    emailVerified: { type: Boolean, required: true },
    role: {
      type: String,
      enum: ["admin", "employee", "client", "applicant"],
      required: true,
    },
    image: { type: String, required: true },
    isApproved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User = model<IUser>("User", UserSchema);
