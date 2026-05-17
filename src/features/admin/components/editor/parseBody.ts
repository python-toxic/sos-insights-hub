import type { AdminArticle } from "../../types";

/** Serialize structured blocks to a plain text editor format. */
export function bodyToText(body: AdminArticle["body"]): string {
  return body
    .map((b) => {
      if (b.type === "h2") return `## ${b.text}`;
      if (b.type === "ul") return b.items.map((i) => `- ${i}`).join("\n");
      if (b.type === "quote") return `> ${b.text}`;
      return b.text;
    })
    .join("\n\n");
}

/** Parse plain text (with simple markdown-ish syntax) into structured blocks. */
export function textToBody(text: string): AdminArticle["body"] {
  const blocks: AdminArticle["body"] = [];
  const chunks = text.split(/\n\s*\n/);
  for (const raw of chunks) {
    const c = raw.trim();
    if (!c) continue;
    if (c.startsWith("## ")) {
      blocks.push({ type: "h2", text: c.slice(3).trim() });
    } else if (c.startsWith("> ")) {
      blocks.push({ type: "quote", text: c.slice(2).trim() });
    } else if (
      /^-\s+/m.test(c) &&
      c.split("\n").every((l) => /^-\s+/.test(l.trim()))
    ) {
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
