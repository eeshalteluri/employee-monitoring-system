import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    backendJWT?: string;
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    backendJWT?: string;
    id: string;
    role: string;
  }
}
