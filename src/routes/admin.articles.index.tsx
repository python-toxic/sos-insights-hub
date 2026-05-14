import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { deleteArticle, useAdminArticles } from "@/lib/admin-store";
import { formatDate } from "@/data/insights";

export const Route = createFileRoute("/admin/articles/")({
  head: () => ({ meta: [{ title: "Articles — SOS India Admin" }] }),
  component: ArticlesList,
});

function ArticlesList() {
  const articles = useAdminArticles();
  const [q, setQ] = useState("");
  const [confirm, setConfirm] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    const sorted = [...articles].sort((a, b) =>
      a.updatedAt < b.updatedAt ? 1 : -1,
    );
    if (!s) return sorted;
    return sorted.filter(
      (a) =>
        a.title.toLowerCase().includes(s) ||
        a.category.toLowerCase().includes(s),
    );
  }, [articles, q]);

  const target = confirm ? articles.find((a) => a.slug === confirm) : null;

  return (
    <AdminLayout>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Articles
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage all newsletters and insights.
          </p>
        </div>
        <Link
          to="/admin/articles/new"
          className="inline-flex h-10 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Create new article
        </Link>
      </div>

      <div className="mt-6">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by title or category…"
          className="h-10 w-full max-w-md rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-primary"
        />
      </div>

      <div className="mt-4 overflow-hidden rounded-lg border border-border bg-background">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-5 py-3 font-medium">Title</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-10 text-center text-muted-foreground">
                  No articles found.
                </td>
              </tr>
            )}
            {filtered.map((a) => (
              <tr key={a.slug} className="hover:bg-muted/30">
                <td className="px-5 py-3">
                  <div className="font-medium text-foreground">{a.title}</div>
                  <div className="text-xs text-muted-foreground">{a.category}</div>
                </td>
                <td className="px-5 py-3">
                  <span
                    className={
                      "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium " +
                      (a.status === "published"
                        ? "bg-accent text-accent-foreground"
                        : "bg-muted text-muted-foreground")
                    }
                  >
                    {a.status === "published" ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-5 py-3 text-muted-foreground">
                  {formatDate(a.publishedAt)}
                </td>
                <td className="px-5 py-3 text-right">
                  <div className="inline-flex gap-2">
                    <Link
                      to="/admin/articles/$id/edit"
                      params={{ id: a.slug }}
                      className="rounded-md border border-input bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => setConfirm(a.slug)}
                      className="rounded-md border border-input bg-background px-3 py-1.5 text-xs font-medium text-destructive transition-colors hover:bg-destructive/10"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {target && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 px-4"
          onClick={() => setConfirm(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-lg border border-border bg-background p-6 shadow-lg"
          >
            <h3 className="text-base font-semibold text-foreground">
              Delete article?
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              "{target.title}" will be permanently removed. This cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setConfirm(null)}
                className="h-9 rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground hover:bg-accent"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteArticle(target.slug);
                  setConfirm(null);
                }}
                className="h-9 rounded-md bg-destructive px-4 text-sm font-medium text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
