"use client";

import { cn } from "cn";
import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

/**
 * Tiny scroll-reveal wrappers (fade + small rise) so server components can
 * stay on the server while grids/headings get staggered entrance animations.
 * `prefers-reduced-motion` is neutralized two ways:
 *  1. `motion-reduce:*!` utilities override the inline styles Motion sets,
 *     so reduced-motion visitors see a fully static page (also before hydration).
 *  2. Consequently no walk/scan JS branch is needed for reduced motion.
 */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const groupVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.02 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

const STATIC_GUARDS =
  "motion-reduce:transform-none! motion-reduce:transition-none! motion-reduce:opacity-100!";

type MotionTagName = "div" | "li" | "span" | "ol" | "ul";

const motionTags = {
  div: motion.div,
  li: motion.li,
  span: motion.span,
  ol: motion.ol,
  ul: motion.ul,
} as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Extra delay in seconds (e.g. 0.15) applied after the section enters the viewport. */
  delay?: number;
};

/** Single block that fades in and rises slightly when it scrolls into view. */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      className={cn(className, STATIC_GUARDS)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-64px" }}
      transition={{ duration: 0.65, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  /** Render the group as a specific tag (e.g. `as="ol"` so `<li>` children stay valid). */
  as?: MotionTagName;
};

/**
 * Grid/list container that staggers its <RevealItem/> children.
 * Pass your grid classes here — this element becomes the grid itself.
 */
export function RevealGroup({ children, className, as = "div" }: RevealGroupProps) {
  const Tag = motionTags[as];
  return (
    <Tag
      className={cn(className, STATIC_GUARDS)}
      variants={groupVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-64px" }}
    >
      {children}
    </Tag>
  );
}

type RevealItemProps = {
  children: ReactNode;
  className?: string;
  as?: MotionTagName;
};

/** One child of a <RevealGroup/>; inherits the staggered variant from the group. */
export function RevealItem({ children, className, as = "div" }: RevealItemProps) {
  const Tag = motionTags[as];
  return (
    <Tag className={cn(className, STATIC_GUARDS)} variants={itemVariants}>
      {children}
    </Tag>
  );
}

type DrawLineProps = {
  orientation?: "horizontal" | "vertical";
  className?: string;
};

/** Decorative connector line that draws itself when it scrolls into view. */
export function DrawLine({ orientation = "horizontal", className }: DrawLineProps) {
  return (
    <motion.span
      aria-hidden
      className={cn(className, STATIC_GUARDS)}
      initial={orientation === "horizontal" ? { scaleX: 0 } : { scaleY: 0 }}
      whileInView={{ scaleX: 1, scaleY: 1 }}
      viewport={{ once: true, margin: "-64px" }}
      transition={{ duration: 1.1, ease: "easeOut" }}
      style={{
        transformOrigin:
          orientation === "horizontal" ? "left center" : "center top",
      }}
    />
  );
}
