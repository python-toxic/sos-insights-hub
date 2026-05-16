import { Link } from "@tanstack/react-router";
import { Anchor, Menu, X } from "lucide-react";
import { useState } from "react";

const NAV = [
  { label: "Services", href: "#" },
  { label: "About", href: "#" },
  { label: "Insights", to: "/insights" as const },
  { label: "Contact", href: "#" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-6 md:px-8">
        <Link
          to="/"
          className="flex items-center gap-2 text-foreground"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground sm:h-9 sm:w-9">
            <Anchor className="h-4 w-4" />
          </span>
          <span className="text-sm font-semibold tracking-tight sm:text-base">
            SOS India
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm lg:flex">
          {NAV.map((item) =>
            item.to ? (
              <Link
                key={item.label}
                to={item.to}
                activeProps={{ className: "text-foreground font-medium" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ),
          )}
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:bg-accent lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6">
            {NAV.map((item) =>
              item.to ? (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  activeProps={{ className: "bg-accent text-foreground" }}
                  className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  {item.label}
                </a>
              ),
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
