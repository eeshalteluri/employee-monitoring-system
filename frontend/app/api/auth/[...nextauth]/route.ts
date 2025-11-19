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
    async signIn({ user, account, profile }) {
      console.log("🔵 [signIn] STARTED");
      console.log("🔵 [signIn] Received user:", user);
      console.log("🔵 [signIn] Account:", account);
      console.log("🔵 [signIn] Profile:", profile);

      if (account?.provider !== "google") {
        console.log("🔵 [signIn] Not Google provider → rejecting");
        return false;
      }

      // Read role from cookie
      const cookieStore = await cookies();
      const selectedRole =
        cookieStore.get("selected_role")?.value || "employee";

      console.log("🟣 [signIn] Selected role from cookie:", selectedRole);

      try {
        console.log("🟣 [signIn] Sending request to backend...");

        const backendRes = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google`,
          {
            email: user.email,
            name: user.name,
            image: user.image,
            emailVerified: true,
            role: selectedRole,
          }
        );

        console.log("🟢 [signIn] Backend response:", backendRes.data);

        const backendJWT = backendRes.data.token;
        const backendUser = backendRes.data.user;

        console.log("🟢 [signIn] Backend JWT:", backendJWT);
        console.log("🟢 [signIn] Backend User:", backendUser);

        // Attach backend data to user → JWT callback will read this
        (user as any).backendJWT = backendJWT;
        (user as any).role = backendUser.role;

        console.log("🟢 [signIn] user.backendJWT assigned:", backendJWT);
        console.log("🟢 [signIn] user.role assigned:", backendUser.role);

        console.log("🟢 [signIn] COMPLETED SUCCESSFULLY");
        return true;
      } catch (error: any) {
        console.error("🔴 [signIn] Backend error:", error?.response?.data || error);
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

        console.log("🟡 [jwt] token.backendJWT set:", token.backendJWT);
        console.log("🟡 [jwt] token.role set:", token.role);
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
