"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  ArrowRight,
  Building2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Autoplay, Keyboard, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export interface HeroSlide {
  image: string;
  category: string;
  headline: string;
  description: string;
}

const slides: HeroSlide[] = [
  {
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1600&auto=format&fit=crop",
    category: "Photo Studios",
    headline: "Shot-ready studios, booked in minutes",
    description:
      "Portrait lofts, cyc walls, and daylight setups — reserved by the hour so your next frame happens on schedule.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1600&auto=format&fit=crop",
    category: "Sound Stages",
    headline: "Full-scale stages for full-scale ideas",
    description:
      "Blackout sound stages with rigging grids, drive-in access, and production offices for film and commercial crews.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=1600&auto=format&fit=crop",
    category: "Podcast Rooms",
    headline: "Press record in a room that sounds rich",
    description:
      "Acoustically treated podcast suites with broadcast mics, engineers, and video capture — just bring the conversation.",
  },
];

export function HeroSlider() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="relative" aria-label="Featured spaces">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, Keyboard]}
        onSwiper={(s) => (swiperRef.current = s)}
        loop
        keyboard={{ enabled: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        grabCursor
        pagination={{ el: ".hero-pagination", clickable: true }}
        className="group/hero h-[34rem] sm:h-[38rem] lg:h-[42rem] w-full"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i} className="relative overflow-hidden">
            {/* Slide image — slow cinematic zoom (see .hero-slide-img in globals.css) */}
            <Image
              src={slide.image}
              alt={slide.category}
              fill
              priority={i === 0}
              sizes="100vw"
              className="hero-slide-img object-cover"
            />
            {/* Textural overlays */}
            <span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/60 to-foreground/10"
            />
            <span
              aria-hidden
              className="bg-dotted absolute inset-0 opacity-50"
            />

            {/* Copy */}
            <div className="container-page relative flex h-full items-end pb-16 sm:items-center sm:pb-0">
              <div className="max-w-2xl animate-in fade-in fill-mode-both slide-in-from-bottom-4 pb-10 duration-700 sm:pb-16">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/95 px-3 py-1 text-xs font-semibold tracking-wide text-primary-foreground uppercase">
                  <Sparkles className="size-3.5" />
                  {slide.category}
                </span>
                <h1 className="mt-4 font-heading text-4xl leading-[1.05] font-semibold text-background sm:text-5xl lg:text-6xl">
                  {slide.headline}
                </h1>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-background/75 sm:text-lg">
                  {slide.description}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href="/studios"
                    className={buttonVariants({
                      size: "lg",
                      className: "gap-2",
                    })}
                  >
                    Explore Studios
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover/button:translate-x-0.5" />
                  </Link>
                  <Link
                    href="/add-studio"
                    className={buttonVariants({
                      size: "lg",
                      variant: "outline",
                      className:
                        "border-background/40 bg-background/10 text-background backdrop-blur-sm hover:bg-background hover:text-foreground",
                    })}
                  >
                    <Building2 className="size-4" />
                    Host Your Space
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Pagination bullets (wired via pagination.el) */}
        <div
          className="hero-pagination absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5"
          role="group"
          aria-label="Slide bullets"
        />

        {/* Arrows */}
        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute top-1/2 left-4 z-10 hidden size-11 -translate-y-1/2 place-items-center rounded-full border border-background/20 bg-foreground/30 text-background backdrop-blur-sm transition-all hover:bg-foreground/50 focus-visible:ring-3 focus-visible:ring-ring/50 sm:grid"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute top-1/2 right-4 z-10 hidden size-11 -translate-y-1/2 place-items-center rounded-full border border-background/20 bg-foreground/30 text-background backdrop-blur-sm transition-all hover:bg-foreground/50 focus-visible:ring-3 focus-visible:ring-ring/50 sm:grid"
        >
          <ChevronRight className="size-5" />
        </button>
      </Swiper>

      {/* Amber pagination identity, scoped to this slider */}
    
    </section>
  );
}
