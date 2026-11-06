"use client";

import { Toaster as Sonner } from "sonner";
import { AlertTriangle, CheckCircle2, Info, Loader2, XCircle } from "lucide-react";

export function Toaster() {
  return (
    <Sonner
      theme="system"
      position="top-center"
      duration={4000}
      gap={10}
      icons={{
        success: <CheckCircle2 className="size-5 text-emerald-500" />,
        error: <XCircle className="size-5 text-red-500" />,
        info: <Info className="size-5 text-sky-500" />,
        warning: <AlertTriangle className="size-5 text-amber-500" />,
        loading: <Loader2 className="size-5 animate-spin text-primary" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "!w-full !gap-3 !rounded-2xl !border !border-border/60 !bg-background/85 !px-4 !py-3.5 !text-foreground !shadow-[0_12px_40px_-12px_rgba(0,0,0,0.35)] !backdrop-blur-xl",
          title: "!text-sm !font-semibold",
          description: "!text-sm !text-muted-foreground",
        },
      }}
    />
  );
}