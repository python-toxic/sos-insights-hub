import { Link } from "@tanstack/react-router";
import { Calendar, Clock } from "lucide-react";
import type { Article } from "@/data/insights";
import { formatDate } from "@/data/insights";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      to="/insights/$slug"
      params={{ slug: article.slug }}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[var(--shadow-card)]"
    >
      <div className="aspect-[16/9] w-full overflow-hidden bg-muted">
        <img
          src={article.coverImage}
          alt={article.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="inline-flex w-fit items-center rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-primary">
          {article.category}
        </span>
        <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight text-foreground group-hover:text-primary">
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {article.excerpt}
        </p>
        <div className="mt-5 flex items-center gap-4 border-t border-border pt-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            <time dateTime={article.publishedAt}>
              {formatDate(article.publishedAt)}
            </time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {article.readingTime} min read
          </span>
          <span className="ml-auto font-medium text-primary">Read more →</span>
        </div>
      </div>
    </Link>
  );
}
