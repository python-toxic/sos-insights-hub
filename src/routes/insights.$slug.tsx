import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { getArticleBySlug, formatDate } from "@/data/insights";
import { ArticleBody } from "@/components/insights/ArticleBody";
import { ShareButtons } from "@/components/insights/ShareButtons";
import { RelatedArticles } from "@/components/insights/RelatedArticles";

export const Route = createFileRoute("/insights/$slug")({
  loader: ({ params }) => {
    const article = getArticleBySlug(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.article;
    if (!a) {
      return {
        meta: [{ title: "Article not found — SOS India" }],
      };
    }
    return {
      meta: [
        { title: `${a.title} — SOS India Insights` },
        { name: "description", content: a.excerpt },
        { property: "og:title", content: a.title },
        { property: "og:description", content: a.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:image", content: a.coverImage },
        { property: "article:published_time", content: a.publishedAt },
        { property: "article:section", content: a.category },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: a.coverImage },
      ],
    };
  },
  notFoundComponent: ArticleNotFound,
  errorComponent: ({ error, reset }) => (
    <div className="mx-auto max-w-2xl px-5 py-24 text-center">
      <h1 className="text-2xl font-semibold text-foreground">
        Something went wrong
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
      <button
        onClick={reset}
        className="mt-6 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
      >
        Try again
      </button>
    </div>
  ),
  component: ArticlePage,
});

function ArticleNotFound() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-24 text-center">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">
        Article not found
      </h1>
      <p className="mt-3 text-muted-foreground">
        The insight you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/insights"
        className="mt-6 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        Browse all insights
      </Link>
    </div>
  );
}

function ArticlePage() {
  const { article } = Route.useLoaderData();

  return (
    <div className="px-4 py-8 sm:px-6 md:px-8 md:py-14">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/insights"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Insights
        </Link>
      </div>

      <article className="mx-auto mt-6 max-w-6xl sm:mt-8">
        <header className="mx-auto max-w-[68ch]">
          <span className="inline-flex items-center rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-primary">
            {article.category}
          </span>
          <h1 className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl md:text-4xl">
            {article.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {article.excerpt}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">
              {article.author}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <time dateTime={article.publishedAt}>
                {formatDate(article.publishedAt)}
              </time>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {article.readingTime} min read
            </span>
          </div>
        </header>

        <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-lg border border-border">
          <img
            src={article.coverImage}
            alt={article.title}
            className="aspect-[16/9] w-full object-cover"
          />
        </div>

        <div className="mt-12">
          <ArticleBody blocks={article.body} />
        </div>

        <div className="mt-12">
          <ShareButtons title={article.title} />
        </div>

        <RelatedArticles slug={article.slug} />
      </article>
    </div>
  );
}
