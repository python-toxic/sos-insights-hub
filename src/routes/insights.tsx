import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ARTICLES, type Category } from "@/data/insights";
import { ArticleCard } from "@/components/insights/ArticleCard";
import { SearchBar } from "@/components/insights/SearchBar";
import { CategoryFilter } from "@/components/insights/CategoryFilter";
import { Pagination } from "@/components/insights/Pagination";

const PAGE_SIZE = 6;

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Insights & Newsletters — SOS India" },
      {
        name: "description",
        content:
          "Maritime consultancy and ship recycling insights from SOS India — regulations, compliance, safety, and sustainability updates for shipping professionals.",
      },
      { property: "og:title", content: "Insights & Newsletters — SOS India" },
      {
        property: "og:description",
        content:
          "Regulations, compliance, safety, and sustainability updates for maritime and ship recycling professionals.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: InsightsPage,
});

function InsightsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category | "All">("All");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return ARTICLES.filter((a) => {
      const matchesCat = category === "All" || a.category === category;
      const matchesQ =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q);
      return matchesCat && matchesQ;
    }).sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
  }, [search, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
      <header className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-wider text-primary">
          Insights & Newsletters
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Maritime and ship recycling intelligence
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          Practical analysis, regulatory updates, and operational guidance for
          shipowners, managers, and recycling stakeholders — curated by the SOS
          India team.
        </p>
      </header>

      <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <SearchBar
          value={search}
          onChange={(v) => {
            setSearch(v);
            setPage(1);
          }}
        />
        <CategoryFilter
          active={category}
          onChange={(c) => {
            setCategory(c);
            setPage(1);
          }}
        />
      </div>

      {visible.length === 0 ? (
        <div className="mt-16 rounded-lg border border-dashed border-border bg-muted/40 p-12 text-center">
          <p className="text-base font-medium text-foreground">
            No articles match your search
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try a different keyword or category.
          </p>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      )}

      <Pagination
        page={currentPage}
        totalPages={totalPages}
        onChange={setPage}
      />
    </div>
  );
}
