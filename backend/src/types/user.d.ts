import { Types } from "mongoose";

export type UserRole = "admin" | "employee" | "client" | "applicant";

export interface IUser {
  name: string;
  email: string;
  emailVerified: boolean;
  role: UserRole;
  phone?: string;
  image?: string;
  metadata?: Record<string, unknown>;
  isActive: boolean;
  assignedClientIds?: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}
