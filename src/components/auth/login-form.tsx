"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { motion, type Variants } from "motion/react";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const inputCls =
  "h-11 rounded-xl bg-muted/40 pl-10 transition-colors focus-visible:bg-background";

/** শুধু নিজের সাইটের path গ্রহণ করবে (open redirect আটকাতে) */
function getSafeRedirect(value: string | null) {
  if (value && value.startsWith("/") && !value.startsWith("//")) return value;
  return "/";
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
      <path
        fill="#4285F4"
        d="M23.5 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.45a5.52 5.52 0 0 1-2.39 3.62v3h3.87c2.26-2.09 3.57-5.16 3.57-8.81z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.93-2.91l-3.87-3a7.24 7.24 0 0 1-4.06 1.17c-3.13 0-5.78-2.11-6.72-4.95H1.3v3.1A11.99 11.99 0 0 0 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.31a7.2 7.2 0 0 1 0-4.62v-3.1H1.3a11.99 11.99 0 0 0 0 10.82z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.36.61 4.6 1.8l3.42-3.42A11.5 11.5 0 0 0 12 0 11.99 11.99 0 0 0 1.3 6.59z"
      />
    </svg>
  );
}

export function GoogleButton({
  label,
  redirectTo = "/",
}: {
  label: string;
  redirectTo?: string;
}) {
  const [loading, setLoading] = useState(false);

  async function handleGoogle() {
    setLoading(true);
    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: `${
          window.location.origin
        }/login?googleLogin=success&redirect=${encodeURIComponent(redirectTo)}`,
      });

      if (error) {
        toast.error(error.message || "Google login failed. Please try again.");
        setLoading(false);
      }
    } catch (err) {
      console.error("Google login error:", err);
      toast.error("Google login failed. Please try again.");
      setLoading(false);
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      disabled={loading}
      className="h-11 w-full gap-2.5 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-md"
      onClick={handleGoogle}
    >
      {loading ? <Loader2 className="size-4 animate-spin" /> : <GoogleIcon />}
      {label}
    </Button>
  );
}

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const hasShownGoogleToast = useRef(false);
  const hasClearedSession = useRef(false);

  const redirectTo = getSafeRedirect(searchParams.get("redirect"));
  const isRegistered = searchParams.get("registered") === "true";
  const isGoogleLogin = searchParams.get("googleLogin") === "success";

  // Registration এর পর auto sign-in হওয়া session মুছে দেওয়া
  useEffect(() => {
    if (isRegistered && !hasClearedSession.current) {
      hasClearedSession.current = true;

      authClient
        .signOut()
        .then(() => router.refresh())
        .catch((err) => console.error("Sign out after register failed:", err));
    }
  }, [isRegistered, router]);

  // Google Login Success Toast + desired route এ পাঠানো
  useEffect(() => {
    if (isGoogleLogin && !hasShownGoogleToast.current) {
      hasShownGoogleToast.current = true;

      toast.success(
        "Welcome back! You have successfully logged in with Google.",
        { duration: 4000 }
      );

      router.replace(redirectTo);
      router.refresh();
    }
  }, [isGoogleLogin, redirectTo, router]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setErrorMessage("");
    setIsLoading(true);

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        rememberMe: remember,
      });

      if (error) {
        const message = error.message || "Login failed. Please try again.";
        setErrorMessage(message);
        toast.error(message);
        return;
      }

      if (data) {
        toast.success("Welcome back! You have successfully logged in.", {
          duration: 4000,
        });
        router.push(redirectTo);
        router.refresh();
      }
    } catch (error) {
      console.error("Login error:", error);
      const message = "Something went wrong. Please try again.";
      setErrorMessage(message);
      toast.error(message);
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
          Welcome back
        </h1>
        <p className="text-sm text-muted-foreground">
          Log in to book studios, manage listings, and see your schedule.
        </p>
      </motion.div>

      {isRegistered && (
        <motion.p
          variants={item}
          role="status"
          className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300"
        >
          Account created! Please log in with your email and password.
        </motion.p>
      )}

      <motion.div variants={item} className="flex flex-col gap-4">
        <GoogleButton label="Continue with Google" redirectTo={redirectTo} />

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" />
          or log in with email
          <span className="h-px flex-1 bg-border" />
        </div>
      </motion.div>

      <motion.form
        variants={item}
        onSubmit={handleSubmit}
        className="flex flex-col gap-5"
      >
        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="login-email">Email</Label>
          <div className="relative">
            <Mail className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="login-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@studio.com"
              className={inputCls}
            />
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="login-password">Password</Label>
            <Link
              href="/login"
              className="text-xs font-medium text-accent-foreground underline-offset-4 hover:underline"
              aria-label="Reset your password"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="login-password"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={`${inputCls} pr-11`}
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
        </div>

        {/* Remember Me */}
        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="size-4 rounded accent-[var(--primary)]"
          />
          Remember me on this device
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
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </Button>
      </motion.form>

      <motion.p
        variants={item}
        className="text-center text-sm text-muted-foreground"
      >
        New to SceneSlot?{" "}
        <Link
          href="/register"
          className="font-medium text-accent-foreground underline-offset-4 hover:underline"
        >
          Create an account
        </Link>
      </motion.p>
    </motion.div>
  );
}