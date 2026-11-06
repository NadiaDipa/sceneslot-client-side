import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_URI_BETTER_AUTH as string);
const db = client.db("sceneslot-db");

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  database: mongodbAdapter(db, {
    client,
  }),
  // Session data is signed as a JWT and kept in an HTTPOnly cookie
  // (same settings as the Express server's auth.js)
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
      strategy: "jwt",
    },
  },
});

/**
 * Case-insensitive email existence check for the app's own duplicate
 * prevention. Better Auth itself only ever writes normalized (lowercase)
 * emails, but a case-insensitive query also catches any legacy record that
 * may have been stored with mixed casing before this was enforced.
 */
// NOTE: emails are always stored lowercase; Better Auth normalizes writes.
export async function userEmailExists(email: string): Promise<boolean> {
  const escaped = email.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  if (!escaped) return false;

  const doc = await db
    .collection("user")
    .findOne({ email: { $regex: `^${escaped}$`, $options: "i" } });

  return Boolean(doc);
}