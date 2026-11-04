
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { GoogleButton } from "@/components/auth/login-form";
import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const rules = [
  { label: "At least 6 characters", test: (v: string) => v.length >= 6 },
  { label: "One uppercase letter", test: (v: string) => /[A-Z]/.test(v) },
  { label: "One lowercase letter", test: (v: string) => /[a-z]/.test(v) },
];

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

    // Password validation
    if (!rules.every((rule) => rule.test(password))) {
      setPasswordError("Please meet all password requirements.");
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await signUp.email({
        name,
        email,
        password,
        image: photoUrl.trim() || undefined,
      });

      if (error) {
        setErrorMessage(
          error.message || "Registration failed. Please try again."
        );
        return;
      }

      if (data) {
        toast.success("Account created successfully!");
        router.push("/login?registered=true");
      }
    } catch (err) {
      console.error("Signup failed:", err);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-heading text-2xl font-semibold sm:text-3xl">
          Create your SceneSlot account
        </h1>

        <p className="text-sm text-muted-foreground">
          One account to book studios — and to host spaces of your own.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <GoogleButton label="Sign up with Google" />

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" />
          or register with email
          <span className="h-px flex-1 bg-border" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Name */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="reg-name">Full name</Label>

          <div className="relative">
            <User className="absolute top-2.5 left-2.5 size-4 text-muted-foreground" />

            <Input
              id="reg-name"
              name="name"
              required
              autoComplete="name"
              placeholder="Amara Hossain"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="reg-email">Email</Label>

          <div className="relative">
            <Mail className="absolute top-2.5 left-2.5 size-4 text-muted-foreground" />

            <Input
              id="reg-email"
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="you@studio.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-8"
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
          />

          <p className="text-xs text-muted-foreground">
            Optional — a profile photo builds trust with hosts.
          </p>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="reg-password">Password</Label>

          <div className="relative">
            <Lock className="absolute top-2.5 left-2.5 size-4 text-muted-foreground" />

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

          {password && (
            <ul className="flex flex-col gap-0.5 pt-1">
              {rules.map((rule) => {
                const isValid = rule.test(password);

                return (
                  <li
                    key={rule.label}
                    className={
                      isValid
                        ? "text-xs text-emerald-700"
                        : "text-xs text-muted-foreground"
                    }
                  >
                    {isValid ? "✓" : "•"} {rule.label}
                  </li>
                );
              })}
            </ul>
          )}

          {passwordError && (
            <p className="text-xs text-destructive" role="alert">
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
            className="mt-0.5 size-4 accent-[var(--primary)]"
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

        {/* Registration Error */}
        {errorMessage && (
          <p className="text-sm text-destructive" role="alert">
            {errorMessage}
          </p>
        )}

        {/* Register Button */}
        <Button
          type="submit"
          size="lg"
          className="mt-1 w-full"
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Create account"}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-accent-foreground underline-offset-4 hover:underline"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}
