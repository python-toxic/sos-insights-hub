import { useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import {
  ADMIN_CATEGORIES,
  saveArticle,
  slugify,
  type AdminArticle,
} from "@/lib/admin-store";
import type { Category } from "@/data/insights";

interface Props {
  initial?: AdminArticle;
  mode: "new" | "edit";
}

function bodyToText(body: AdminArticle["body"]): string {
  return body
    .map((b) => {
      if (b.type === "h2") return `## ${b.text}`;
      if (b.type === "ul") return b.items.map((i) => `- ${i}`).join("\n");
      if (b.type === "quote") return `> ${b.text}`;
      return b.text;
    })
    .join("\n\n");
}

function textToBody(text: string): AdminArticle["body"] {
  const blocks: AdminArticle["body"] = [];
  const chunks = text.split(/\n\s*\n/);
  for (const raw of chunks) {
    const c = raw.trim();
    if (!c) continue;
    if (c.startsWith("## ")) {
      blocks.push({ type: "h2", text: c.slice(3).trim() });
    } else if (c.startsWith("> ")) {
      blocks.push({ type: "quote", text: c.slice(2).trim() });
    } else if (/^-\s+/m.test(c) && c.split("\n").every((l) => /^-\s+/.test(l.trim()))) {
      blocks.push({
        type: "ul",
        items: c.split("\n").map((l) => l.trim().replace(/^-\s+/, "")),
      });
    } else {
      blocks.push({ type: "p", text: c });
    }
  }
  return blocks;
}

export function ArticleEditor({ initial, mode }: Props) {
  const navigate = useNavigate();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [category, setCategory] = useState<Category>(
    initial?.category ?? "Regulations",
  );
  const [coverImage, setCoverImage] = useState(initial?.coverImage ?? "");
  const [content, setContent] = useState(
    initial ? bodyToText(initial.body) : "",
  );
  const [author, setAuthor] = useState(
    initial?.author ?? "SOS India Editorial",
  );
  const published = true;
  const fileRef = useRef<HTMLInputElement>(null);

  const onUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => setCoverImage(String(reader.result));
    reader.readAsDataURL(file);
  };

  const submit = () => {
    if (!title.trim()) {
      alert("Please add a title before saving.");
      return;
    }
    const slug = initial?.slug ?? slugify(title);
    const now = new Date().toISOString();
    const wordCount = content.split(/\s+/).filter(Boolean).length;
    const reading = Math.max(1, Math.round(wordCount / 220));
    const article: AdminArticle = {
      slug,
      title: title.trim(),
      excerpt: excerpt.trim(),
      category,
      coverImage:
        coverImage ||
        "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1600&q=80",
      author: author.trim() || "SOS India Editorial",
      readingTime: reading,
      publishedAt: initial?.publishedAt ?? now,
      body: textToBody(content),
      status: "published",
      updatedAt: now,
    };
    saveArticle(article);
    navigate({ to: "/admin/articles" });
  };

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            {mode === "new" ? "New article" : "Edit article"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Write and publish a newsletter or insight.
          </p>
        </div>
        <div className="flex gap-2 sm:shrink-0">
          <button
            onClick={submit}
            className="h-10 w-full rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 sm:w-auto"
          >
            {mode === "new" ? "Publish" : "Save changes"}
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-6 sm:mt-8 lg:grid-cols-[1fr_320px] lg:gap-8">
        <div className="space-y-6">
          <Field label="Title">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Article title"
              className="h-12 w-full rounded-md border border-input bg-background px-4 text-lg font-medium outline-none focus:border-primary"
            />
          </Field>

          <Field label="Short summary (excerpt)">
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={2}
              placeholder="One or two sentences that introduce the article."
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </Field>

          <Field
            label="Article content"
            hint="Use ## for headings, - for bullet lists, > for quotes. Empty line separates paragraphs."
          >
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={16}
              placeholder="Write your article…"
              className="min-h-[320px] w-full rounded-md border border-input bg-background px-4 py-3 font-serif text-[15px] leading-[1.7] outline-none focus:border-primary sm:min-h-[480px]"
            />
          </Field>
        </div>

        <aside className="space-y-6">
          <Field label="Featured image">
            <div className="rounded-md border border-border bg-background p-3">
              {coverImage ? (
                <img
                  src={coverImage}
                  alt=""
                  className="aspect-[16/9] w-full rounded object-cover"
                />
              ) : (
                <div className="flex aspect-[16/9] items-center justify-center rounded bg-muted text-xs text-muted-foreground">
                  No image
                </div>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) onUpload(f);
                }}
              />
              <button
                onClick={() => fileRef.current?.click()}
                className="mt-3 h-9 w-full rounded-md border border-input bg-background text-xs font-medium text-foreground hover:bg-accent"
              >
                Upload image
              </button>
            </div>
          </Field>

          <Field label="Category">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-primary"
            >
              {ADMIN_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Author">
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-primary"
            />
          </Field>

        </aside>
      </div>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-foreground">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
