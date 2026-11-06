"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

export function NewsletterForm() {
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubscribed(true);
    toast.success("You're subscribed. Welcome to the SceneSlot newsletter!");
  }

  if (subscribed) {
    return (
      <p className="rounded-full bg-primary/20 px-4 py-2.5 text-sm font-medium text-white">
        You&apos;re on the list — first issue lands next Tuesday.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm items-center gap-2"
      aria-label="Newsletter subscription"
    >
      <Input
        type="email"
        name="email"
        required
        placeholder="you@studio.com"
        className="h-11 rounded-full border-white/15 bg-white/5 text-white placeholder:text-white/65 focus-visible:border-primary focus-visible:ring-primary/40"
      />
      <Button
        type="submit"
        size="icon"
        aria-label="Subscribe"
        className="size-11 shrink-0 rounded-full shadow-lg shadow-primary/40 hover:shadow-primary/60"
      >
        <Send />
      </Button>
    </form>
  );
}