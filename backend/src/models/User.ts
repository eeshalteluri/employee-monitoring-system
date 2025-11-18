import mongoose from "mongoose";

export type Role = "admin" | "client" | "employee" | "applicant"

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  emailVerified: {type: Boolean},
  image: String,
  role: {
      type: String,
      enum: ["admin", "client", "employee", "applicant"],
      default: "employee",
    },
  provider: String, // "google"
}, { timestamps: true });

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  image: string;
  role: Role;
  provider: string;
}

export default mongoose.model<IUser>("User", UserSchema);
