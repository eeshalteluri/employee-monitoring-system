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
    phone: { type: String },
    image: { type: String },
    metadata: { type: Object },
    isActive: { type: Boolean, default: true },
    assignedClientIds: [{ type: Schema.Types.ObjectId, ref: "clients" }],
  },
  { timestamps: true }
);

export const UserModel = model<IUser>("User", UserSchema);
