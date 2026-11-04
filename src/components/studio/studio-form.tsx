
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { categoryNames } from "@/data/categories";
import { API_BASE } from "@/lib/api";
import type { Studio } from "@/lib/types";
import { cn } from "cn";
import {
  BadgeCheck,
  Camera,
  ImageUp,
  Loader2,
  Lock,
  Plus,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState, type ChangeEvent, type FormEvent } from "react";

const AMENITY_OPTIONS = [
  "Cyc Wall",
  "Strobe Lighting",
  "Acoustic Treatment",
  "Backline Available",
  "Changing Room",
  "Free Wi-Fi",
  "Loading Dock",
  "Kitchenette",
  "Drive-in Access",
  "Make-up Corner",
  "On-site Engineer",
  "Night Sessions OK",
  "Skylight",
  "Projector & Screen",
  "Secure Parking",
];

type FormState = {
  title: string;
  category: string;
  hourlyRate: string;
  deposit: string;
  maxCapacity: string;
  location: string;
  address: string;
  imageUrl: string;
  amenities: string[];
  overview: string;
};

function toFormState(studio?: Studio): FormState {
  return {
    title: studio?.title ?? "",
    category: studio?.category ?? "",
    hourlyRate: studio ? String(studio.hourlyRate) : "",
    deposit: studio ? String(studio.deposit) : "",
    maxCapacity: studio ? String(studio.maxCapacity) : "",
    location: studio?.location ?? "",
    address: studio?.address ?? "",
    imageUrl: studio?.image ?? "",
    amenities: studio?.amenities ?? [],
    overview: studio?.overview ?? "",
  };
}

export function StudioForm({
  studio,
  mode = "create",
  hostName = "",
  hostEmail = "",
}: {
  studio?: Studio;
  mode?: "create" | "edit";
  hostName?: string;
  hostEmail?: string;
}) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<FormState>(() => toFormState(studio));
  const [submitted, setSubmitted] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Host information fallback
  const displayedHostName =
    hostName || studio?.ownerName || studio?.host?.name || "";

  const displayedHostEmail =
    hostEmail || studio?.ownerEmail || studio?.host?.email || "";

  const set = (key: keyof FormState, value: string | string[]) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  function toggleAmenity(a: string) {
    setForm((f) => ({
      ...f,
      amenities: f.amenities.includes(a)
        ? f.amenities.filter((x) => x !== a)
        : [...f.amenities, a],
    }));
  }

  // Upload a file from the user's computer.
  async function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(`${API_BASE}/upload`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok || !data.imageUrl) {
        alert(data.error || "Image upload failed.");
      } else {
        set("imageUrl", data.imageUrl);
      }
    } catch (error) {
      console.error("Image upload error:", error);
      alert("Image upload failed. Is the server (port 5000) running?");
    } finally {
      setUploading(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!form.imageUrl.trim()) {
      alert("Please upload a cover image from your computer.");
      return;
    }

    if (saving) return;

    const studioData = {
      title: form.title,
      category: form.category,
      hourlyRate: Number(form.hourlyRate),
      deposit: Number(form.deposit),
      maxCapacity: Number(form.maxCapacity),
      location: form.location,
      address: form.address,
      image: form.imageUrl,
      amenities: form.amenities,
      overview: form.overview,
    };

    const isEdit = mode === "edit" && studio;

    const url = isEdit
      ? `${API_BASE}/studios/${studio.id}`
      : `${API_BASE}/studios`;

    setSaving(true);

    try {
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studioData),
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitted(true);

        alert(
          isEdit
            ? "Changes saved successfully!"
            : "Studio published successfully!",
        );

        router.push("/my-listings");
        router.refresh();
      } else {
        console.error("Studio save failed:", data);

        alert(
          data.error ||
            data.message ||
            (isEdit
              ? "Failed to save changes."
              : "Failed to publish studio."),
        );
      }
    } catch (error) {
      console.error("Error saving studio:", error);

      alert(
        isEdit
          ? "Failed to save changes. Please try again."
          : "Failed to publish studio. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10">
      {/* Basics */}
      <fieldset className="flex flex-col gap-5">
        <legend className="font-heading text-lg font-semibold">
          Studio basics
        </legend>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="studio-title">Studio title</Label>
          <Input
            id="studio-title"
            required
            placeholder="e.g. Golden Hour Portrait Loft"
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label>Category</Label>
          <Select
            value={form.category}
            onValueChange={(v) => set("category", v ?? "")}
          >
            <SelectTrigger className="w-full sm:w-72" aria-label="Category">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>

            <SelectContent>
              {categoryNames.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="studio-rate">Hourly rate (USD)</Label>
            <Input
              id="studio-rate"
              type="number"
              required
              min={5}
              placeholder="45"
              value={form.hourlyRate}
              onChange={(e) => set("hourlyRate", e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="studio-deposit">Security deposit (USD)</Label>
            <Input
              id="studio-deposit"
              type="number"
              required
              min={0}
              placeholder="100"
              value={form.deposit}
              onChange={(e) => set("deposit", e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="studio-capacity">Maximum capacity</Label>
            <Input
              id="studio-capacity"
              type="number"
              required
              min={1}
              placeholder="12"
              value={form.maxCapacity}
              onChange={(e) => set("maxCapacity", e.target.value)}
            />
          </div>
        </div>
      </fieldset>

      {/* Location */}
      <fieldset className="flex flex-col gap-5">
        <legend className="font-heading text-lg font-semibold">
          Location
        </legend>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="studio-location">City / area</Label>
            <Input
              id="studio-location"
              required
              placeholder="e.g. Brooklyn, NY"
              value={form.location}
              onChange={(e) => set("location", e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="studio-address">Street address</Label>
            <Input
              id="studio-address"
              required
              placeholder="e.g. 212 Water Street, Brooklyn, NY 11249"
              value={form.address}
              onChange={(e) => set("address", e.target.value)}
            />
          </div>
        </div>
      </fieldset>

      {/* Imagery */}
      <fieldset className="flex flex-col gap-5">
        <legend className="font-heading text-lg font-semibold">
          Cover image
        </legend>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="studio-image">Cover image</Label>

          <input
            ref={fileInputRef}
            id="studio-image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="sr-only w-full"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex w-full cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-border bg-muted/40 px-6 py-8 text-center transition-colors hover:border-primary/50 hover:bg-muted/70 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-60"
          >
            {uploading ? (
              <Loader2 className="size-5 animate-spin text-primary" />
            ) : (
              <ImageUp className="size-5 text-primary" />
            )}

            <span className="text-sm font-medium">
              {uploading
                ? "Uploading image…"
                : "Click to upload from your computer"}
            </span>

            <span className="text-xs text-muted-foreground">
              JPG, PNG, or WebP · up to 20 MB · wide 16:10 images look best on
              cards
            </span>
          </button>

          {form.imageUrl ? (
            <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Camera className="size-3.5 text-primary" />
              <span className="truncate">
                Uploaded: {form.imageUrl.split("/uploads/").pop()}
              </span>
            </p>
          ) : null}
        </div>

        {form.imageUrl ? (
          <div className="relative aspect-video w-full max-w-md overflow-hidden rounded-xl ring-1 ring-foreground/10">
            <img
              src={form.imageUrl}
              alt="Cover preview"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <button
              type="button"
              onClick={() => set("imageUrl", "")}
              aria-label="Remove cover image"
              className="absolute top-2 right-2 grid size-7 place-items-center rounded-full bg-foreground/60 text-background transition-colors hover:bg-destructive"
            >
              <X className="size-3.5" />
            </button>
          </div>
        ) : null}
      </fieldset>

      {/* Amenities */}
      <fieldset className="flex flex-col gap-4">
        <legend className="font-heading text-lg font-semibold">
          Amenities
        </legend>

        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {AMENITY_OPTIONS.map((a) => (
            <label
              key={a}
              className={cn(
                "flex cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-2.5 text-sm transition-colors",
                form.amenities.includes(a)
                  ? "border-primary bg-accent text-accent-foreground"
                  : "border-input hover:bg-muted/60",
              )}
            >
              <Checkbox
                checked={form.amenities.includes(a)}
                onCheckedChange={() => toggleAmenity(a)}
                aria-label={a}
              />
              {a}
            </label>
          ))}
        </div>

        {form.amenities.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {form.amenities.map((a) => (
              <span
                key={a}
                className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
              >
                {a}

                <button
                  type="button"
                  onClick={() => toggleAmenity(a)}
                  aria-label={`Remove ${a}`}
                  className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                >
                  <X className="size-3" />
                </button>
              </span>
            ))}
          </div>
        ) : null}
      </fieldset>

      {/* Overview */}
      <fieldset className="flex flex-col gap-5">
        <legend className="font-heading text-lg font-semibold">
          Detailed overview
        </legend>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="studio-overview">
            Tell creators what makes this space special
          </Label>

          <Textarea
            id="studio-overview"
            required
            rows={7}
            placeholder="Describe the light, the gear that comes with the booking, house rules, and the kind of work this room is best for…"
            value={form.overview}
            onChange={(e) => set("overview", e.target.value)}
            className="resize-y"
          />

          <p className="text-xs text-muted-foreground">
            {form.overview.length} characters · you can edit this later from My
            Studio Listings.
          </p>
        </div>
      </fieldset>

      {/* Host info */}
      <fieldset className="rounded-2xl border border-border bg-muted/40 p-5">
        <div className="mb-4 flex items-center gap-2">
          <Lock className="size-4 text-primary" />

          <legend className="font-heading text-lg font-semibold">
            Host information
          </legend>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="host-name">Host name</Label>
            <Input
              id="host-name"
              value={displayedHostName}
              readOnly
              className="bg-background text-muted-foreground"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="host-email">Host email</Label>
            <Input
              id="host-email"
              value={displayedHostEmail}
              readOnly
              className="bg-background text-muted-foreground"
            />
          </div>
        </div>
      </fieldset>

      {/* Actions */}
      <div className="flex flex-col items-start gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Fields marked <span className="text-destructive">*</span> are
          required. Your listing is saved to the SceneSlot database.
        </p>

        <Button
          type="submit"
          size="lg"
          className="shrink-0 gap-2"
          disabled={saving || uploading}
        >
          {saving ? (
            <Loader2 className="size-4 animate-spin" />
          ) : submitted ? (
            <BadgeCheck className="size-4" />
          ) : (
            <Plus className="size-4" />
          )}

          {saving
            ? "Publishing..."
            : mode === "edit"
              ? "Save Changes"
              : "Publish Studio"}
        </Button>
      </div>
    </form>
  );
}
