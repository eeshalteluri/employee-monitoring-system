import { DefaultSession } from "next-auth";
import { JWT } from 'next-auth/jwt';

declare module "next-auth" {
  interface Session {
    backendJWT?: string;
    user: {
      role: "admin" | "client" | "employee" | "applicant";
    } & DefaultSession["user"];
  }

  interface User {
    role: "admin" | "client" | "employee" | "applicant";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    backendJWT?: string;
    role?: "admin" | "client" | "employee" | "applicant";
  }
}
