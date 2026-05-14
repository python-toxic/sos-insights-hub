import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { isAuthed, login } from "@/lib/admin-store";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Admin Login — SOS India" }] }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("SOS@admin");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthed()) navigate({ to: "/admin/dashboard" });
  }, [navigate]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate({ to: "/admin/dashboard" });
    } else {
      setError("Invalid credentials.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <div className="w-full max-w-sm rounded-lg border border-border bg-background p-8 shadow-sm">
        <div className="text-center">
          <div className="text-base font-semibold text-foreground">SOS India</div>
          <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
            Admin Panel
          </div>
        </div>
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground">
              Username
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-primary"
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-primary"
              required
            />
          </div>
          {error && (
            <p className="text-xs text-destructive">{error}</p>
          )}
          <button
            type="submit"
            className="h-10 w-full rounded-md bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Sign in
          </button>
          <p className="text-center text-[11px] text-muted-foreground">
            Demo credentials · SOS@admin / SOS@admin123
          </p>
        </form>
      </div>
    </div>
  );
}
