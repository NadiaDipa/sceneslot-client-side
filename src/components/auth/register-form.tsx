"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Circle, Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { GoogleButton } from "@/components/auth/login-form";
import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion, type Variants } from "motion/react";

const rules = [
  { label: "At least 6 characters", test: (v: string) => v.length >= 6 },
  { label: "One uppercase letter", test: (v: string) => /[A-Z]/.test(v) },
  { label: "One lowercase letter", test: (v: string) => /[a-z]/.test(v) },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const inputCls =
  "h-11 rounded-xl bg-muted/40 transition-colors focus-visible:bg-background";

export function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setPasswordError("");
    setErrorMessage("");

    // Password validation: uppercase, lowercase, min 6 characters
    if (!rules.every((rule) => rule.test(password))) {
      const message = "Please meet all password requirements.";
      setPasswordError(message);
      toast.error(message); // <-- TOAST: invalid password
      return;
    }

    setIsLoading(true);

    try {
      // Emails are normalized to lowercase consistently (registration, login,
      // and database lookups) so casing can never create second accounts.
      const normalizedEmail = email.trim().toLowerCase();

      // Duplicate guard: Better Auth returns an un-distinguishable generic
      // success for an existing email when auto sign-in is off, so check
      // case-insensitively first and surface a real error.
      const checkRes = await fetch(
        `/api/users/check-email?email=${encodeURIComponent(normalizedEmail)}`
      );

      if (checkRes.ok) {
        const { exists } = await checkRes.json();

        if (exists) {
          const message =
            "An account with this email already exists. Please log in instead.";
          setErrorMessage(message);
          toast.error(message);
          return;
        }
      }

      const { data, error } = await signUp.email({
        name,
        email: normalizedEmail,
        password,
        image: photoUrl.trim() || undefined,
      });

      if (error) {
        const message =
          error.message || "Registration failed. Please try again.";
        setErrorMessage(message);
        toast.error(message); // <-- TOAST: registration failed
        return;
      }

      if (data) {
        toast.success("Account created successfully!");
        router.push("/login?registered=true");
      }
    } catch (err) {
      console.error("Signup failed:", err);
      const message = "Something went wrong. Please try again.";
      setErrorMessage(message);
      toast.error(message); // <-- TOAST: unexpected error
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-7"
    >
      <motion.div variants={item} className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          Create your SceneSlot account
        </h1>
        <p className="text-sm text-muted-foreground">
          One account to book studios — and to host spaces of your own.
        </p>
      </motion.div>

      <motion.div variants={item} className="flex flex-col gap-4">
        <GoogleButton label="Sign up with Google" />

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" />
          or register with email
          <span className="h-px flex-1 bg-border" />
        </div>
      </motion.div>

      <motion.form
        variants={item}
        onSubmit={handleSubmit}
        className="flex flex-col gap-5"
      >
        {/* Name */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="reg-name">Full name</Label>
          <div className="relative">
            <User className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="reg-name"
              name="name"
              required
              autoComplete="name"
              placeholder="Amara Hossain"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`${inputCls} pl-10`}
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="reg-email">Email</Label>
          <div className="relative">
            <Mail className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="reg-email"
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="you@studio.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${inputCls} pl-10`}
            />
          </div>
        </div>

        {/* Photo URL */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="reg-photo">Photo URL</Label>
          <Input
            id="reg-photo"
            type="url"
            name="photoUrl"
            placeholder="https://i.pravatar.cc/150?img=12 (optional)"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            className={inputCls}
          />
          <p className="text-sm text-muted-foreground">
            Optional — a profile photo builds trust with hosts.
          </p>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="reg-password">Password</Label>
          <div className="relative">
            <Lock className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="reg-password"
              type={showPassword ? "text" : "password"}
              name="password"
              required
              autoComplete="new-password"
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
              className={`${inputCls} pr-11 pl-10`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute top-1/2 right-2 -translate-y-1/2 rounded-lg p-2 text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50"
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>

          {password && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="flex flex-col gap-1 overflow-hidden pt-1.5"
            >
              {rules.map((rule) => {
                const isValid = rule.test(password);

                return (
                  <li
                    key={rule.label}
                    className={`flex items-center gap-2 text-[0.8rem] transition-colors ${
                      isValid
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-muted-foreground"
                    }`}
                  >
                    {isValid ? (
                      <Check className="size-3.5" />
                    ) : (
                      <Circle className="size-3.5" />
                    )}
                    {rule.label}
                  </li>
                );
              })}
            </motion.ul>
          )}

          {passwordError && (
            <p className="text-sm text-destructive" role="alert">
              {passwordError}
            </p>
          )}
        </div>

        {/* Terms and Privacy */}
        <label className="flex cursor-pointer items-start gap-2.5 text-sm text-muted-foreground">
          <input
            type="checkbox"
            required
            checked={agreed}
            name="agreed"
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 size-4 rounded accent-[var(--primary)]"
          />
          <span>
            I agree to the{" "}
            <Link
              href="/terms"
              className="font-medium text-accent-foreground underline-offset-4 hover:underline"
            >
              Terms
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="font-medium text-accent-foreground underline-offset-4 hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </span>
        </label>

        {errorMessage && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            role="alert"
            className="rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-2.5 text-center text-sm text-destructive"
          >
            {errorMessage}
          </motion.p>
        )}

        <Button
          type="submit"
          size="lg"
          disabled={isLoading}
          className="h-12 w-full rounded-xl text-base font-semibold shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/40 active:translate-y-0"
        >
          {isLoading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Creating account...
            </>
          ) : (
            "Create account"
          )}
        </Button>
      </motion.form>

      <motion.p
        variants={item}
        className="text-center text-sm text-muted-foreground"
      >
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-accent-foreground underline-offset-4 hover:underline"
        >
          Log in
        </Link>
      </motion.p>
    </motion.div>
  );
}