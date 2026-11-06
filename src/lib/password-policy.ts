/**
 * Single source of truth for the password policy.
 *
 * Used by:
 *  - Better Auth server config (src/lib/auth.ts): minPasswordLength plus a
 *    hooks-before rule that additionally rejects passwords without a digit
 *  - Signup form (src/components/auth/register-form.tsx): checklist labels,
 *    per-rule tests, and the submit gate
 *
 * The standalone Express server can't import TypeScript from the Next app, so
 * SceneSlot/sceneslot-server/auth.js mirrors these values — keep the two in
 * sync when changing this file.
 */
export const MIN_PASSWORD_LENGTH = 8;

/** Digit rule: at least one digit 0-9 anywhere in the password. */
export function hasDigit(password: string): boolean {
  return /\d/.test(password);
}

/** Server-side error for the digit rule (client checklist uses "One number"). */
export const NUMBER_REQUIRED_MESSAGE = "Password must include at least one number.";

/** Paths that accept a new/changed password in the Better Auth API. */
export const PASSWORD_PATHS = ["/sign-up/email", "/change-password", "/reset-password"];
