import { Types } from "mongoose";

export type UserRole = "admin" | "employee" | "client" | "applicant";

export interface IUser {
  name: string;
  email: string;
  emailVerified: boolean;
  role: UserRole;
  image: string;
  isActive: boolean;
  isApproved: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
