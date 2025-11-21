import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import { cookies } from "next/headers";

const isDebug = true; // toggle logging

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    /* ------------------------------------------------------
     * 1️⃣ SIGN IN — Only runs on Google OAuth login
     * ------------------------------------------------------ */
    async signIn({ user, account }) {
      if (account?.provider !== "google") return false;

      const cookieStore = await cookies();
      const selectedRole =
        cookieStore.get("selected_role")?.value || "employee";

      isDebug &&
        console.log("[signIn] Selected Role:", selectedRole);

      try {
        // ---- Try verifying user first ----
        const verify = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/verify`,
          { email: user.email, role: selectedRole },
          { validateStatus: () => true }
        );

        isDebug &&
          console.log("[signIn] Verify Result:", verify.status);

        // 403 — role mismatch
        if (verify.status === 403) return false;

        // 404 — user doesn't exist → create
        if (verify.status === 404) {
          const created = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google`,
            {
              email: user.email,
              name: user.name,
              image: user.image,
              role: selectedRole,
            }
          );

          user.backendJWT = created.data.token;
          user.role = created.data.user.role;
          user.id = created.data.user.id;

          return true;
        }

        // 200 — user exists
        if (verify.status === 200) {
          user.backendJWT = verify.data.token;
          user.role = verify.data.user.role;
          user.id = verify.data.user.id;

          return true;
        }

        return false;
      } catch (err) {
        console.error("SIGNIN ERROR:", err);
        return false;
      }
    },

    /* ------------------------------------------------------
     * 2️⃣ JWT CALLBACK — Stores JWT & user info
     * ------------------------------------------------------ */
    async jwt({ token, user }) {
      if (user) {
        token.backendJWT = user.backendJWT;
        token.role = user.role;
        token.id = user.id;
      }

      if (!token.role) token.role = "employee";

      return token;
    },

    /* ------------------------------------------------------
     * 3️⃣ SESSION CALLBACK — Exposes token to FE
     * ------------------------------------------------------ */
    async session({ session, token }) {
      session.backendJWT = token.backendJWT;
      session.user.role = token.role;
      session.user.id = token.id;

      return session;
    },
  },

  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
