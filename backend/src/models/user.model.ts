// src/models/user.model.ts
import { Schema, model, Types } from "mongoose";

const UserSchema = new Schema(
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

export const User = model("users", UserSchema);
export type UserDocument = ReturnType<typeof User["hydrate"]>;
