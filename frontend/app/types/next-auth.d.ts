import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    backendJWT?: string;
    user: {
      role: string;
    } & DefaultSession["user"];
  }

  interface User {
    role: string;
  }

  interface JWT {
    backendJWT?: string;
    role: string;
  }
}
