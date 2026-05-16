import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Link2, Check } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAdminArticles } from "@/lib/admin-store";
import { formatDate } from "@/data/insights";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — SOS India Admin" }] }),
  component: Dashboard,
});

function Dashboard() {
  const articles = useAdminArticles();
  const published = articles.filter((a) => a.status === "published");
  const recent = [...published]
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .slice(0, 5);
  const [copied, setCopied] = useState<string | null>(null);

  const copyLink = async (slug: string) => {
    const url = `${window.location.origin}/insights/${slug}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(slug);
    setTimeout(() => setCopied((c) => (c === slug ? null : c)), 1800);
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Overview of your published insights and newsletters.
          </p>
        </div>
        <Link
          to="/admin/articles/new"
          className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto"
        >
          Create new article
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Stat label="Total articles" value={articles.length} />
        <Stat label="Published" value={published.length} />
      </div>

      <div className="mt-10 rounded-lg border border-border bg-background">
        <div className="flex items-center justify-between border-b border-border px-5 py-3">
          <h2 className="text-sm font-medium text-foreground">
            Recently published
          </h2>
          <Link
            to="/admin/articles"
            className="text-xs text-primary hover:underline"
          >
            View all
          </Link>
        </div>
        {recent.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-muted-foreground">
            No articles yet.
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {recent.map((a) => (
              <li
                key={a.slug}
                className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5"
              >
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium text-foreground">
                    {a.title}
                  </div>
                  <div className="mt-0.5 text-xs text-muted-foreground">
                    {a.category} · {formatDate(a.publishedAt)}
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:shrink-0">
                  <button
                    onClick={() => copyLink(a.slug)}
                    title="Copy public link"
                    aria-label="Copy public link"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-foreground transition-colors hover:bg-accent"
                  >
                    {copied === a.slug ? (
                      <Check className="h-3.5 w-3.5 text-primary" />
                    ) : (
                      <Link2 className="h-3.5 w-3.5" />
                    )}
                  </button>
                  <Link
                    to="/admin/articles/$id/edit"
                    params={{ id: a.slug }}
                    className="inline-flex h-9 items-center rounded-md border border-input bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-accent"
                  >
                    Edit
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AdminLayout>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-border bg-background p-5">
      <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
      <div className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
        {value}
      </div>
    </div>
  );
}
