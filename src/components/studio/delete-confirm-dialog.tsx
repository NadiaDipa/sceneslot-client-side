"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, TriangleAlert } from "lucide-react";

interface DeleteConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  /** e.g. a studio name — shown inside the dialog copy */
  itemName: string;
  /** Runs when the user confirms deletion (e.g. the DELETE request). */
  onConfirm?: () => void | Promise<void>;
  /** True while the delete request is in flight — shows a spinner. */
  pending?: boolean;
  /** True when the delete request failed — shows an inline error. */
  onError?: boolean;
}

export function DeleteConfirmDialog({
  open,
  onOpenChange,
  title = "Delete this listing?",
  itemName,
  onConfirm,
  pending = false,
  onError = false,
}: DeleteConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <div className="me-auto grid size-11 place-items-center rounded-xl bg-destructive/10 ring-1 ring-destructive/20">
            <TriangleAlert className="size-5 text-destructive" />
          </div>
          <DialogTitle className="font-heading text-lg font-semibold">
            {title}
          </DialogTitle>
          <DialogDescription>
            <span className="font-medium text-foreground">
              &ldquo;{itemName}&rdquo;
            </span>{" "}
            will be permanently removed, along with any pending booking
            requests. This action can&apos;t be undone.
          </DialogDescription>
          {onError ? (
            <p
              role="alert"
              className="text-sm font-medium text-destructive"
            >
              Couldn&apos;t delete this listing — please try again.
            </p>
          ) : null}
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={pending}
          >
            Keep listing
          </Button>
          <Button variant="destructive" onClick={onConfirm} disabled={pending}>
            {pending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Deleting…
              </>
            ) : (
              "Delete listing"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
