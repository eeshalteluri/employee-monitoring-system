import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import { cookies } from "next/headers";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async jwt({ token, account, profile }) {
      console.log("BACKEND URL:", process.env.NEXT_PUBLIC_BACKEND_URL);

      // First time after Google login
      if (account && profile) {
        // Role was stored earlier in a cookie when user hit /[role]/auth
        const cookieStore = await cookies();
        const roleCookie = cookieStore.get("selected_role")?.value;

        const role = roleCookie ?? "employee";

        const backendRes = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google`,
          {
            email: profile.email,
            name: profile.name,
            emailVerified: true,
            image: profile.image,
            role,
          }
        );

        token.backendJWT = backendRes.data.token;
        token.role = backendRes.data.user.role;
      }

      return token;
    },

    async session({ session, token }) {
      (session as any).backendJWT = token.backendJWT;
      (session as any).user.role = token.role;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
