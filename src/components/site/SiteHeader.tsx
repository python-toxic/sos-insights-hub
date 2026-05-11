import { Link } from "@tanstack/react-router";
import { Anchor } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
        <Link to="/" className="flex items-center gap-2 text-foreground">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Anchor className="h-4 w-4" />
          </span>
          <span className="text-base font-semibold tracking-tight">
            SOS India
          </span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm md:flex">
          <a
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Services
          </a>
          <a
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </a>
          <Link
            to="/insights"
            activeProps={{ className: "text-foreground font-medium" }}
            inactiveProps={{ className: "text-muted-foreground" }}
            className="transition-colors hover:text-foreground"
          >
            Insights
          </Link>
          <a
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Contact
          </a>
        </nav>
        <Link
          to="/insights"
          className="inline-flex h-9 items-center rounded-md border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-accent md:hidden"
        >
          Insights
        </Link>
      </div>
    </header>
  );
}
