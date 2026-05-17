import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminLayout } from "@/features/admin/components/@/components/admin/AdminLayout";
import { ArticleEditor } from "@/features/admin/components/@/components/admin/ArticleEditor";
import { getArticleById } from "@/features/admin";
import { useEffect, useState } from "react";
import type { AdminArticle } from "@/features/admin";

export const Route = createFileRoute("/admin/articles/$id/edit")({
  head: () => ({ meta: [{ title: "Edit article — SOS India Admin" }] }),
  component: EditArticle,
});

function EditArticle() {
  const { id } = Route.useParams();
  const [article, setArticle] = useState<AdminArticle | undefined>(undefined);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setArticle(getArticleById(id));
    setLoaded(true);
  }, [id]);

  return (
    <AdminLayout>
      {!loaded ? null : !article ? (
        <div className="rounded-lg border border-border bg-background p-8 text-center">
          <h2 className="text-base font-semibold text-foreground">
            Article not found
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            It may have been deleted.
          </p>
          <Link
            to="/admin/articles"
            className="mt-4 inline-flex h-9 items-center rounded-md border border-input bg-background px-4 text-sm font-medium hover:bg-accent"
          >
            Back to articles
          </Link>
        </div>
      ) : (
        <ArticleEditor mode="edit" initial={article} />
      )}
    </AdminLayout>
  );
}
