"use client";

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "cn";
import { categories } from "@/data/categories";

/* Custom themed replacement for the hero's native <select>.
   Trigger = value text + rotating chevron (the CATEGORY label + filter icon
   stay on the surrounding field markup). The option list renders through a
   portal to <body> with fixed positioning, so the hero's overflow-hidden can
   never clip it. A rect-drift rAF check closes the panel when the trigger
   moves (autoplay slide change / scroll), so it can't be dragged around. */
export function HeroCategorySelect({
  value,
  onValueChange,
}: {
  /* Optional controlled mode — when provided, the parent owns the value (the
     hero search submits it); otherwise the component keeps its own state. */
  value?: string | null;
  onValueChange?: (v: string | null) => void;
}) {
  const [internalSelected, setInternalSelected] = useState<string | null>(null);
  const selected = value !== undefined ? value : internalSelected;
  const setSelected = (v: string | null) => {
    if (onValueChange) onValueChange(v);
    else setInternalSelected(v);
  };
  const [open, setOpen] = useState(false);
  /* Second pass for the 150ms fade + slide-down entrance */
  const [visible, setVisible] = useState(false);
  /* Keyboard-highlighted option (roving highlight, focus stays on the panel) */
  const [activeIndex, setActiveIndex] = useState(-1);
  const [rect, setRect] = useState<DOMRect | null>(null);
  /* Down = below the trigger; up = flipped above it. Up is chosen whenever
     opening downward would collide with the pagination bars (or the viewport
     edge), so the listbox can never cover the hero's slide-progress bars. */
  const [dir, setDir] = useState<"down" | "up">("down");

  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  /* Position snapshot taken at open — drift is measured against this */
  const rectRef = useRef<DOMRect | null>(null);

  const close = (refocus = false) => {
    setOpen(false);
    setVisible(false);
    setActiveIndex(-1);
    if (refocus) triggerRef.current?.focus({ preventScroll: true });
  };

  const toggle = () => {
    if (open) {
      close();
      return;
    }
    const r = triggerRef.current?.getBoundingClientRect();
    if (!r) return;
    /* Choose the opening direction before rendering: the panel must fit
       between the trigger and the pagination bars (bars zone = upper bound)
       while also staying on-screen. Falls back upward, then downward. */
    const estPanelH = categories.length * 41 + 14;
    const bars = document.querySelector("[aria-label='Slide progress']");
    const barsTop = bars
      ? bars.getBoundingClientRect().top
      : window.innerHeight;
    const upperBound = Math.min(window.innerHeight, barsTop) - 8;
    const spaceBelow = upperBound - (r.bottom + 8);
    const hasSpaceAbove = r.top - 8 - estPanelH >= 0;
    setDir(spaceBelow >= estPanelH || !hasSpaceAbove ? "down" : "up");

    rectRef.current = r;
    setRect(r);
    setActiveIndex(-1);
    setVisible(false);
    setOpen(true);
  };

  const select = (name: string) => {
    setSelected(name);
    close(true);
  };

  const handleKeys = (e: React.KeyboardEvent) => {
    const last = categories.length - 1;
    if (e.key === "Escape") {
      e.preventDefault();
      close(true);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, last));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Home") {
      e.preventDefault();
      setActiveIndex(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActiveIndex(last);
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      select(categories[activeIndex].name);
    }
  };

  /* Fade/slide entrance: one frame at the hidden state, then reveal */
  useEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, [open]);

  /* Focus the listbox so arrow keys / Enter work right after opening */
  useEffect(() => {
    if (!open) return;
    panelRef.current?.focus({ preventScroll: true });
  }, [open, rect]);

  /* Close on outside pointer-down */
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (panelRef.current?.contains(t) || triggerRef.current?.contains(t)) return;
      close();
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  /* Rect-drift watchdog: the slider autoplays (transform, not scroll), so a
     moved trigger means the context changed — close instead of dragging. */
  useEffect(() => {
    if (!open || !rectRef.current) return;
    let frame = 0;
    const tick = () => {
      const r = triggerRef.current?.getBoundingClientRect();
      const base = rectRef.current;
      if (
        !r ||
        !base ||
        Math.abs(r.left - base.left) > 6 ||
        Math.abs(r.top - base.top) > 6 ||
        Math.abs(r.bottom - base.bottom) > 6
      ) {
        close();
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [open, rect]);

  /* Present listbox options as buttons with role=option; focus stays on the
     listbox while the highlight (activeIndex) moves with the arrow keys. */
  const firstRun = !open || !rect;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={toggle}
        onKeyDown={open ? handleKeys : undefined}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center justify-between gap-1 rounded-lg text-left text-[0.95rem] font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
      >
        <span
          className={cn(
            "truncate",
            selected ? "text-foreground" : "text-muted-foreground/70",
          )}
        >
          {selected ?? "Choose a category"}
        </span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      {!firstRun &&
        createPortal(
          <div
            ref={panelRef}
            role="listbox"
            aria-label="Category"
            tabIndex={-1}
            onKeyDown={handleKeys}
            style={
              dir === "down"
                ? {
                    /* top-full + mt-2 equivalent, measured from the live trigger */
                    top: rect.bottom + 8,
                    left: rect.left,
                    width: Math.max(rect.width, 220),
                  }
                : {
                    /* Flipped: bottom-anchored so the panel grows upward from
                       just above the trigger and the bars below stay visible. */
                    bottom: window.innerHeight - rect.top + 8,
                    left: rect.left,
                    width: Math.max(rect.width, 220),
                  }
            }
            className={cn(
              "fixed z-70 overflow-hidden rounded-2xl border border-border/70 bg-popover p-1.5 text-popover-foreground shadow-xl shadow-black/10 outline-none transition-[opacity,transform] duration-150 ease-out motion-reduce:transition-none dark:shadow-black/40",
              visible ? "translate-y-0 opacity-100" : "-translate-y-1.5 opacity-0",
            )}
          >
            {categories.map((c, idx) => (
              <button
                key={c.name}
                type="button"
                role="option"
                aria-selected={selected === c.name}
                tabIndex={-1}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => select(c.name)}
                className={cn(
                  "flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl px-4 py-2.5 text-left text-[0.95rem] font-medium text-foreground transition-colors duration-150 hover:bg-accent/40",
                  activeIndex === idx && "bg-accent/40",
                  selected === c.name && "text-primary",
                )}
              >
                <span className="truncate">{c.name}</span>
                {selected === c.name && <Check className="size-4 shrink-0 text-primary" />}
              </button>
            ))}
          </div>,
          document.body,
        )}
    </>
  );
}
