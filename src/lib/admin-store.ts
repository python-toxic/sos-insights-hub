import { useEffect, useState } from "react";
import { ARTICLES, CATEGORIES, type Article, type Category } from "@/data/insights";

export type AdminArticle = Article & {
  status: "draft" | "published";
  updatedAt: string;
};

const ARTICLES_KEY = "sos.admin.articles.v1";
const AUTH_KEY = "sos.admin.auth.v1";

function seed(): AdminArticle[] {
  return ARTICLES.map((a) => ({
    ...a,
    status: "published",
    updatedAt: a.publishedAt,
  }));
}

function read(): AdminArticle[] {
  if (typeof window === "undefined") return seed();
  try {
    const raw = localStorage.getItem(ARTICLES_KEY);
    if (!raw) {
      const s = seed();
      localStorage.setItem(ARTICLES_KEY, JSON.stringify(s));
      return s;
    }
    return JSON.parse(raw) as AdminArticle[];
  } catch {
    return seed();
  }
}

function write(items: AdminArticle[]) {
  localStorage.setItem(ARTICLES_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("sos-articles-changed"));
}

export function useAdminArticles() {
  const [items, setItems] = useState<AdminArticle[]>(() =>
    typeof window === "undefined" ? [] : read(),
  );

  useEffect(() => {
    setItems(read());
    const h = () => setItems(read());
    window.addEventListener("sos-articles-changed", h);
    window.addEventListener("storage", h);
    return () => {
      window.removeEventListener("sos-articles-changed", h);
      window.removeEventListener("storage", h);
    };
  }, []);

  return items;
}

export function getArticleById(id: string): AdminArticle | undefined {
  return read().find((a) => a.slug === id);
}

export function saveArticle(a: AdminArticle) {
  const items = read();
  const idx = items.findIndex((x) => x.slug === a.slug);
  if (idx === -1) items.unshift(a);
  else items[idx] = a;
  write(items);
}

export function deleteArticle(slug: string) {
  write(read().filter((a) => a.slug !== slug));
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80) || `article-${Date.now()}`;
}

export const ADMIN_CATEGORIES: Category[] = CATEGORIES;

// Mock auth
export function isAuthed(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(AUTH_KEY) === "1";
}
export function login(email: string, password: string): boolean {
  if (email.trim() && password.trim().length >= 4) {
    localStorage.setItem(AUTH_KEY, "1");
    localStorage.setItem("sos.admin.email", email);
    return true;
  }
  return false;
}
export function logout() {
  localStorage.removeItem(AUTH_KEY);
}
export function currentEmail(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("sos.admin.email") ?? "";
}
