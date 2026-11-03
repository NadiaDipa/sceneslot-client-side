"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

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

export function GoogleButton({ label }: { label: string }) {
  return (
    <Button
      type="button"
      variant="outline"
      className="w-full gap-2.5"
      onClick={() => {
        console.log("Google button clicked");
        authClient.signIn.social({
          provider: "google",
          callbackURL: window.location.origin,
        });
      }}
    >
      <GoogleIcon />
      {label}
    </Button>
  );
}

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setErrorMessage("");
    setIsLoading(true);

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        rememberMe: remember,
        callbackURL: "/",
      });
      console.log("Login data:", data);
      console.log("Login error:", error);

      if (error) {
        setErrorMessage(error.message || "Login failed. Please try again.");
        return;
      }

      if (data) {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-heading text-2xl font-semibold sm:text-3xl">
          Welcome back
        </h1>
        <p className="text-sm text-muted-foreground">
          Log in to book studios, manage listings, and see your schedule.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <GoogleButton label="Continue with Google" />
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" />
          or log in with email
          <span className="h-px flex-1 bg-border" />
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
        noValidate={false}
      >
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="login-email">Email</Label>
          <div className="relative">
            <Mail className="absolute top-2.5 left-2.5 size-4 text-muted-foreground" />
            <Input
              id="login-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@studio.com"
              className="pl-8"
            />
          </div>
        </div>

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
            <Lock className="absolute top-2.5 left-2.5 size-4 text-muted-foreground" />
            <Input
              id="login-password"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="px-8 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute top-0.5 right-1 rounded-md p-2 text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50"
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
        </div>

        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="size-4 accent-[var(--primary)]"
          />
          Remember me on this device
        </label>
        {errorMessage && (
          <p role="alert" className="text-center text-sm text-destructive">
            {errorMessage}
          </p>
        )}

        <Button
          type="submit"
          size="lg"
          className="mt-1 w-full"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        New to SceneSlot?{" "}
        <Link
          href="/register"
          className="font-medium text-accent-foreground underline-offset-4 hover:underline"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}
