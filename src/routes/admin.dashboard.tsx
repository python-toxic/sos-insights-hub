import { createFileRoute, Link } from "@tanstack/react-router";
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
  const drafts = articles.filter((a) => a.status === "draft");
  const recent = [...published]
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .slice(0, 5);

  return (
    <AdminLayout>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Overview of your published insights and newsletters.
          </p>
        </div>
        <Link
          to="/admin/articles/new"
          className="inline-flex h-10 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Create new article
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Stat label="Total articles" value={articles.length} />
        <Stat label="Published" value={published.length} />
        <Stat label="Drafts" value={drafts.length} />
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
                className="flex items-center justify-between px-5 py-3"
              >
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium text-foreground">
                    {a.title}
                  </div>
                  <div className="mt-0.5 text-xs text-muted-foreground">
                    {a.category} · {formatDate(a.publishedAt)}
                  </div>
                </div>
                <Link
                  to="/admin/articles/$id/edit"
                  params={{ id: a.slug }}
                  className="rounded-md border border-input bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent"
                >
                  Edit
                </Link>
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
