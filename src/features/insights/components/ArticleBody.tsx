import type { Block } from "@/features/insights";

export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="mx-auto max-w-[68ch] space-y-6 text-base leading-[1.75] text-foreground/90 sm:text-[17px] sm:leading-[1.8]">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={i}
                className="mt-10 scroll-mt-24 text-2xl font-semibold tracking-tight text-foreground"
              >
                {block.text}
              </h2>
            );
          case "p":
            return (
              <p key={i} className="text-foreground/85">
                {block.text}
              </p>
            );
          case "ul":
            return (
              <ul
                key={i}
                className="ml-5 list-disc space-y-2 text-foreground/85 marker:text-primary"
              >
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="border-l-4 border-primary bg-accent/40 px-5 py-4 text-lg italic text-foreground/90"
              >
                {block.text}
              </blockquote>
            );
        }
      })}
    </div>
  );
}
