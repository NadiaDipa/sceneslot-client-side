import { Logo } from "@/components/layout/logo";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import { Separator } from "@/components/ui/separator";
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
    links: categories.map((c) => ({ href: "/studios", label: c.name })),
  },
];

const socialIcons = [
  {
    label: "X (Twitter)",
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

export function Footer() {
  return (
    <footer className="bg-foreground text-background/85">
      <div className="container-page">
        {/* Top */}
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr] lg:py-16">
          <div className="flex flex-col gap-4 pr-4">
            <Logo light />
            <p className="max-w-xs text-sm leading-relaxed text-background/65">
              SceneSlot is the peer-to-peer marketplace where creators find the
              spaces that bring their ideas to light — and where studio owners
              turn Downtime into income.
            </p>
            <div className="flex items-center gap-2">
              {socialIcons.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid size-9 place-items-center rounded-lg border border-background/15 text-background/70 transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  {s.node}
                </a>
              ))}
            </div>
          </div>

          {footerColumns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="flex flex-col gap-3">
              <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-background">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-background/65 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="flex flex-col gap-3">
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-background">
              Stay in the loop
            </h3>
            <p className="text-sm text-background/65">
              Drop-in rates, new studios, and creator stories — once a week, no
              noise.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <Separator className="bg-background/10" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
          <p className="text-xs text-background/55">
            © {new Date().getFullYear()} SceneSlot Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/terms" className="text-xs text-background/55 transition-colors hover:text-primary">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-xs text-background/55 transition-colors hover:text-primary">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
