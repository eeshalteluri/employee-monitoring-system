import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import { cookies } from "next/headers";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    /**
     * ----------------------------------------------------
     * 1️⃣ SIGNIN CALLBACK — runs ONLY on Google OAuth login
     * ----------------------------------------------------
     */
    async signIn({ user, account }) {
      console.log("🔵 [signIn] STARTED");

      if (account?.provider !== "google") return false;

      const cookieStore = await cookies();
      const selectedRole =
        cookieStore.get("selected_role")?.value || "employee";

      console.log("🟣 Selected Role:", selectedRole);

      try {
        // --------------------------------------
        // 1. Try verifying user
        // --------------------------------------
        const verifyRes = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/verify`,
          { email: user.email, role: selectedRole },
          { validateStatus: () => true } // <-- IMPORTANT
        );

        console.log("🔵 VERIFY RESULT:", verifyRes.status, verifyRes.data);

        // --------------------------------------
        // A. User exists but wrong role → reject
        // --------------------------------------
        if (verifyRes.status === 403) {
          console.log("⛔ ROLE MISMATCH");
          return false;
        }

        // --------------------------------------
        // B. User NOT found → create new user
        // --------------------------------------
        if (verifyRes.status === 404) {
          console.log("🟡 Creating new user...");

          const createRes = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google`,
            {
              email: user.email,
              name: user.name,
              image: user.image,
              role: selectedRole,
            }
          );

          (user as any).backendJWT = createRes.data.token;
          (user as any).role = createRes.data.user.role;

          return true;
        }

        // --------------------------------------
        // C. User exists with correct role
        // --------------------------------------
        if (verifyRes.status === 200) {
          (user as any).backendJWT = verifyRes.data.token;
          (user as any).role = verifyRes.data.user.role;
          return true;
        }

        return false;
      } catch (err) {
        console.error("🔴 SIGNIN Fatal Error:", err);
        return false;
      }
    },

    /**
     * ----------------------------------------------------
     * 2️⃣ JWT CALLBACK — runs after signIn() & every request
     * ----------------------------------------------------
     */
    async jwt({ token, user, account }) {
      console.log("🟡 [jwt] STARTED");
      console.log("🟡 [jwt] Existing token:", token);
      console.log("🟡 [jwt] Incoming user:", user);
      console.log("🟡 [jwt] Account:", account);

      // First login: "user" exists only when signIn() just happened
      if (user) {
        console.log("🟡 [jwt] First login detected — copying from user");

        token.backendJWT = (user as any).backendJWT;
        token.role = (user as any).role;
        token.id = (user as any).id;

        console.log("🟡 [jwt] token.backendJWT set:", token.backendJWT);
        console.log("🟡 [jwt] token.role set:", token.role);
        console.log("🟡 [jwt] token.id set:", token.id);
      }

      // Ensure token.role always exists
      if (!token.role) {
        console.log("🟠 [jwt] token.role missing — applying fallback");
        token.role = "employee";
      }

      console.log("🟢 [jwt] FINAL token:", token);
      console.log("🟢 [jwt] COMPLETED");
      return token;
    },

    /**
     * ----------------------------------------------------
     * 3️⃣ SESSION CALLBACK — session exposed to frontend
     * ----------------------------------------------------
     */
    async session({ session, token }) {
      console.log("🔶 [session] STARTED");
      console.log("🔶 [session] Incoming session:", session);
      console.log("🔶 [session] Incoming token:", token);

      session.backendJWT = token.backendJWT as string | undefined;
      session.user.role = (token.role ??
        "employee") as "admin" | "client" | "employee" | "applicant";
        session.user.id = token.id as string

      console.log("🟢 [session] session.backendJWT set:", session.backendJWT);
      console.log("🟢 [session] session.user.role set:", session.user.role);

      console.log("🟢 [session] COMPLETED");
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
