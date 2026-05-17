/**
 * Persistence layer for admin articles.
 *
 * Currently backed by localStorage. Isolated here so it can be swapped
 * for an API/Cloud client without touching consumers.
 */
import { ARTICLES } from "@/features/insights";
import type { AdminArticle } from "../types";

const ARTICLES_KEY = "sos.admin.articles.v1";
const CHANGE_EVENT = "sos-articles-changed";

function seed(): AdminArticle[] {
  return ARTICLES.map((a) => ({
    ...a,
    status: "published",
    updatedAt: a.publishedAt,
  }));
}

export function readArticles(): AdminArticle[] {
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

export function writeArticles(items: AdminArticle[]) {
  localStorage.setItem(ARTICLES_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function subscribeArticles(handler: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(CHANGE_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}
