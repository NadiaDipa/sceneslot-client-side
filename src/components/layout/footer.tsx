import { Logo } from "@/components/layout/logo";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { categories } from "@/data/categories";
import Link from "next/link";

const quickLinks: { href: string; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/studios", label: "Explore Studios" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About Us" },
  { href: "/add-studio", label: "Host Your Space" },
];

/* Brand X logo — not shipped in lucide, so drawn inline */
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const footerColumns = [
  { title: "Quick Links", links: quickLinks },
  {
    title: "Studio Categories",
    links: categories.map((c) => ({
      href: `/studios?category=${encodeURIComponent(c.name)}`,
      label: c.name,
    })),
  },
];

const socialIcons = [
  {
    label: "X",
    href: "https://x.com",
    node: <XIcon className="size-4" />,
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    node: <InstagramGlyph className="size-4" />,
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    node: <YouTubeGlyph className="size-4" />,
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    node: <FacebookGlyph className="size-4" />,
  },
];

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YouTubeGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
      <rect x="2.5" y="5.5" width="19" height="13" rx="3.5" />
      <path d="M10.2 9.4v5.2l4.4-2.6z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M13.5 21v-7h2.4l.4-2.8h-2.8V9.4c0-.8.2-1.3 1.3-1.3h1.6V5.6c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v1.7H7.8V14h2.4v7z" />
    </svg>
  );
}

/* Link hover: shift to primary with a small underline slide-in */
const footerLinkClasses =
  "relative inline-block text-sm text-white/65 transition-colors hover:text-primary after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100 focus-visible:after:scale-x-100 motion-reduce:after:transition-none";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-foreground dark:bg-secondary">
      {/* Soft orange radial glow in the corner + faint dot pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-36 right-0 h-96 w-[36rem] rounded-full bg-primary/25 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-0 h-80 w-[26rem] rounded-full bg-primary/10 blur-[130px]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-dotted opacity-40" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* CTA band with gradient border, inside the footer */}
        <Reveal className="pt-14 sm:pt-16">
          <div className="rounded-3xl bg-gradient-to-r from-primary via-amber-300 to-primary p-px">
            <div className="flex flex-col items-center justify-between gap-6 rounded-[calc(1.5rem-1.5px)] bg-foreground px-6 py-10 text-center sm:flex-row sm:px-10 sm:text-left dark:bg-secondary">
              <h2 className="max-w-xl font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Own a creative space? Let it shoot for you.
              </h2>
              <Link
                href="/add-studio"
                className={buttonVariants({
                  size: "lg",
                  className:
                    "shrink-0 gap-2 shadow-lg shadow-primary/40 hover:shadow-primary/60",
                })}
              >
                Host your space
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Columns */}
        <Reveal delay={0.1}>
          <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr] lg:py-16">
            {/* Brand */}
            <div className="flex flex-col gap-4 sm:pr-4">
              <Logo light />
              <p className="max-w-xs text-sm leading-relaxed text-white/65">
                SceneSlot is the peer-to-peer marketplace where creators find the
                spaces that bring their ideas to light — and where studio owners
                turn downtime into income.
              </p>
              <div className="flex items-center gap-2">
                {socialIcons.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="grid size-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-all duration-300 outline-none hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/30 focus-visible:ring-3 focus-visible:ring-ring/50 motion-reduce:transition-none motion-reduce:hover:translate-y-0!"
                  >
                    {s.node}
                  </a>
                ))}
              </div>
            </div>

            {footerColumns.map((col) => (
              <nav
                key={col.title}
                aria-label={col.title}
                className="flex flex-col gap-3"
              >
                <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
                  {col.title}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className={footerLinkClasses}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            {/* Newsletter */}
            <div className="flex flex-col gap-3">
              <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
                Stay in the loop
              </h3>
              <p className="text-sm text-white/65">
                Drop-in rates, new studios, and creator stories — once a week, no
                noise.
              </p>
              <NewsletterForm />
            </div>
          </div>
        </Reveal>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 sm:flex-row">
          <p className="text-xs text-white/55">
            © {new Date().getFullYear()} SceneSlot Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className={footerLinkClasses}>
              Terms of Service
            </Link>
            <Link href="/privacy" className={footerLinkClasses}>
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
