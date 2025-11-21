import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    backendJWT?: string;
    user: {
      id: string;
      role: "admin" | "client" | "employee" | "applicant";
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: "admin" | "client" | "employee" | "applicant";
    backendJWT?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "admin" | "client" | "employee" | "applicant";
    backendJWT?: string;
  }
}
