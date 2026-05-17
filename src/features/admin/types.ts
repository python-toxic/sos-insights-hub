import type { Article } from "@/features/insights";

export type AdminArticle = Article & {
  status: "draft" | "published";
  updatedAt: string;
};
