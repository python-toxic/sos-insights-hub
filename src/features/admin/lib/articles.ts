import { useEffect, useState } from "react";
import type { Category } from "@/features/insights";
import { CATEGORIES } from "@/features/insights";
import type { AdminArticle } from "../types";
import { readArticles, subscribeArticles, writeArticles } from "./storage";

export const ADMIN_CATEGORIES: Category[] = CATEGORIES;

export function useAdminArticles(): AdminArticle[] {
  const [items, setItems] = useState<AdminArticle[]>(() =>
    typeof window === "undefined" ? [] : readArticles(),
  );

  useEffect(() => {
    setItems(readArticles());
    return subscribeArticles(() => setItems(readArticles()));
  }, []);

  return items;
}

export function getArticleById(id: string): AdminArticle | undefined {
  return readArticles().find((a) => a.slug === id);
}

export function saveArticle(a: AdminArticle) {
  const items = readArticles();
  const idx = items.findIndex((x) => x.slug === a.slug);
  if (idx === -1) items.unshift(a);
  else items[idx] = a;
  writeArticles(items);
}

export function deleteArticle(slug: string) {
  writeArticles(readArticles().filter((a) => a.slug !== slug));
}

export function slugify(s: string): string {
  return (
    s
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 80) || `article-${Date.now()}`
  );
}
