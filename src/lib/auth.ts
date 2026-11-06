import { APIError, betterAuth } from "better-auth";
import { createAuthMiddleware } from "better-auth/api";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import {
  hasDigit,
  MIN_PASSWORD_LENGTH,
  NUMBER_REQUIRED_MESSAGE,
  PASSWORD_PATHS,
} from "@/lib/password-policy";

const client = new MongoClient(process.env.MONGODB_URI_BETTER_AUTH as string);
const db = client.db("sceneslot-db");

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    /* Explicit (Better Auth's silent default is also 8) so the number is
       visible and kept in one place with the signup form via password-policy. */
    minPasswordLength: MIN_PASSWORD_LENGTH,
  },
  /* Password quality beyond length: reject passwords without a digit on every
     endpoint that accepts a password, so the API stays strict even when the
     client-side checklist is bypassed. */
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      const password = (ctx.body as { password?: string } | undefined)?.password;

      if (
        PASSWORD_PATHS.includes(ctx.path) &&
        typeof password === "string" &&
        !hasDigit(password)
      ) {
        throw new APIError("BAD_REQUEST", { message: NUMBER_REQUIRED_MESSAGE });
      }
    }),
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