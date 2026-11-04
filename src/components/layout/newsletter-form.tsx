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
      <p className="rounded-lg bg-primary/15 px-3 py-2.5 text-sm font-medium text-primary">
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
        className="h-9 border-foreground/15 bg-background/10 text-background placeholder:text-background/50 focus-visible:border-primary focus-visible:ring-primary/30"
      />
      <Button type="submit" size="icon" aria-label="Subscribe">
        <Send />
      </Button>
    </form>
  );
}