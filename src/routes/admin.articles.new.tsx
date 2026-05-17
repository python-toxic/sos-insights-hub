import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/features/admin/components/AdminLayout";
import { ArticleEditor } from "@/features/admin/components/ArticleEditor";

export const Route = createFileRoute("/admin/articles/new")({
  head: () => ({ meta: [{ title: "New article — SOS India Admin" }] }),
  component: NewArticle,
});

function NewArticle() {
  return (
    <AdminLayout>
      <ArticleEditor mode="new" />
    </AdminLayout>
  );
}
