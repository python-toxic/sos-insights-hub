import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ArticleEditor } from "@/components/admin/ArticleEditor";

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
