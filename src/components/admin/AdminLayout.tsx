import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { currentEmail, isAuthed, logout } from "@/lib/admin-store";

export function AdminLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isAuthed()) navigate({ to: "/admin" });
  }, [navigate, pathname]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const nav = [
    { to: "/admin/dashboard", label: "Dashboard" },
    { to: "/admin/articles", label: "Articles" },
    { to: "/admin/articles/new", label: "New article" },
  ];

  const isActive = (to: string) =>
    to === "/admin/articles" ? pathname === "/admin/articles" : pathname === to;

  return (
    <div className="min-h-screen bg-muted/40">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-4 md:gap-8">
            <Link
              to="/admin/dashboard"
              className="truncate text-sm font-semibold text-foreground"
            >
              SOS India{" "}
              <span className="text-muted-foreground">· Admin</span>
            </Link>
            <nav className="hidden items-center gap-1 md:flex">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className={
                    "rounded-md px-3 py-1.5 text-sm transition-colors " +
                    (isActive(n.to)
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground")
                  }
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden text-xs text-muted-foreground lg:inline">
              {currentEmail()}
            </span>
            <button
              onClick={() => {
                logout();
                navigate({ to: "/admin" });
              }}
              className="hidden h-9 rounded-md border border-input bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-accent sm:inline-flex sm:items-center"
            >
              Sign out
            </button>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-foreground hover:bg-accent md:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="border-t border-border bg-background md:hidden">
            <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className={
                    "rounded-md px-3 py-2.5 text-sm font-medium transition-colors " +
                    (isActive(n.to)
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground")
                  }
                >
                  {n.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  logout();
                  navigate({ to: "/admin" });
                }}
                className="mt-1 rounded-md border border-input bg-background px-3 py-2.5 text-left text-sm font-medium text-foreground hover:bg-accent sm:hidden"
              >
                Sign out
              </button>
            </nav>
          </div>
        )}
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        {children}
      </main>
    </div>
  );
}
