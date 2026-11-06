import { userEmailExists } from "@/lib/auth";
import { NextResponse } from "next/server";

/**
 * Duplicate-account guard for the register form.
 *
 * Better Auth's sign-up already normalizes emails to lowercase and rejects
 * existing accounts, but with `autoSignIn: false` a duplicate attempt returns
 * a generic 200 "synthetic user" (anti-enumeration) that the form cannot
 * distinguish from success. This endpoint gives the form a reliable,
 * case-insensitive existence check so duplicate registrations surface a real
 * error instead of a fake confirmation.
 */
export async function GET(request: Request) {
  const email = new URL(request.url).searchParams.get("email") ?? "";
  const normalized = email.trim().toLowerCase();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
    return NextResponse.json({ exists: false });
  }

  const exists = await userEmailExists(normalized);

  return NextResponse.json({ exists });
}
