import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { currentEmail, isAuthed, logout } from "@/lib/admin-store";

export function AdminLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (!isAuthed()) navigate({ to: "/admin" });
  }, [navigate, pathname]);

  const nav = [
    { to: "/admin/dashboard", label: "Dashboard" },
    { to: "/admin/articles", label: "Articles" },
    { to: "/admin/articles/new", label: "New article" },
  ];

  return (
    <div className="min-h-screen bg-muted/40">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-8">
            <Link to="/admin/dashboard" className="text-sm font-semibold text-foreground">
              SOS India <span className="text-muted-foreground">· Admin</span>
            </Link>
            <nav className="flex items-center gap-1">
              {nav.map((n) => {
                const active =
                  n.to === "/admin/articles"
                    ? pathname === "/admin/articles"
                    : pathname === n.to;
                return (
                  <Link
                    key={n.to}
                    to={n.to}
                    className={
                      "rounded-md px-3 py-1.5 text-sm transition-colors " +
                      (active
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:text-foreground")
                    }
                  >
                    {n.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-muted-foreground sm:inline">
              {currentEmail()}
            </span>
            <button
              onClick={() => {
                logout();
                navigate({ to: "/admin" });
              }}
              className="rounded-md border border-input bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  );
}
