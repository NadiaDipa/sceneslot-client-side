import Link from "next/link";
import { cn } from "cn";

interface LogoProps {
  className?: string;
  /** For dark panels (footer): white wordmark + champagne accent */
  light?: boolean;
}

export function Logo({ className, light = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-2 sm:gap-3",
        light ? "text-white" : "text-foreground",
        className
      )}
    >
      <svg
        width="42"
        height="42"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 size-8 sm:size-[42px] transition-transform duration-300 group-hover:rotate-[8deg] motion-reduce:transform-none"
        aria-hidden
      >
        <defs>
          <linearGradient
            id="scene-gradient"
            x1="4"
            y1="4"
            x2="36"
            y2="36"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#A5713C" />
            <stop offset="1" stopColor="#5B2812" />
          </linearGradient>
        </defs>

        {/* Soft brown brand tile */}
        <rect
          width="40"
          height="40"
          rx="20"
          fill="url(#scene-gradient)"
        />

        {/* Aperture mark */}
        <circle
          cx="20"
          cy="20"
          r="10.5"
          stroke="#E4D6A9"
          strokeWidth="1.8"
        />
        {/* Shutter blades */}
        <g stroke="#E4D6A9" strokeWidth="1.8" strokeLinecap="round">
          <path d="M15.2 14.6L17.8 17.8" />
          <path d="M25.6 15.4L21.6 17.4" />
          <path d="M13.6 21.6L17.2 20.2" />
          <path d="M26.4 21L22.6 19.6" />
          <path d="M17.4 25.8L18.6 22" />
          <path d="M23.4 25.4L20.6 22.6" />
        </g>
        <circle cx="20" cy="20" r="2.1" fill="#978F66" />
      </svg>

      <span className="font-brand text-[18px] leading-none font-bold tracking-[-0.015em] sm:text-[23px]">
        Scene
        <span className={light ? "text-[#E4D6A9]" : "text-primary"}>
          Slot
        </span>
        <span
          className={cn(
            "ml-0.5",
            light ? "text-[#E4D6A9]" : "text-primary"
          )}
        >
          .
        </span>
      </span>
    </Link>
  );
}
