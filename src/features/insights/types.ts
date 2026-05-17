export type Category =
  | "Regulations"
  | "Compliance"
  | "Safety"
  | "Sustainability";

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  publishedAt: string; // ISO
  readingTime: number; // minutes
  coverImage: string;
  author: string;
  body: Block[];
}

export const CATEGORIES: Category[] = [
  "Regulations",
  "Compliance",
  "Safety",
  "Sustainability",
];
