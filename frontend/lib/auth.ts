import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { client } from "@/frontend/lib/mongo-client";

export const auth = betterAuth({
  database: mongodbAdapter(client.db()),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "applicant",
        input: false, // don't allow user to set role
      },
    }
  }
});
