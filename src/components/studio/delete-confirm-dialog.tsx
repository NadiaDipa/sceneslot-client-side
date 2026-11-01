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
import { TriangleAlert } from "lucide-react";

interface DeleteConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  /** e.g. a studio name — shown inside the dialog copy */
  itemName: string;
  /** Runs when the user confirms deletion (e.g. the DELETE request). */
  onConfirm?: () => void | Promise<void>;
}

export function DeleteConfirmDialog({
  open,
  onOpenChange,
  title = "Delete listing",
  itemName,
  onConfirm,
}: DeleteConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <div className="grid size-11 place-items-center rounded-xl bg-destructive/10">
            <TriangleAlert className="size-5 text-destructive" />
          </div>
          <DialogTitle className="font-heading text-lg">{title}</DialogTitle>
          <DialogDescription>
            &ldquo;{itemName}&rdquo; will be permanently removed, along with any
            pending booking requests. This action can&apos;t be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Keep listing
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Delete listing
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
