import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Recycle, FileCheck2 } from "lucide-react";
import { ARTICLES } from "@/data/insights";
import { ArticleCard } from "@/components/insights/ArticleCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SOS India — Maritime & Ship Recycling Consultancy" },
      {
        name: "description",
        content:
          "SOS India provides maritime consultancy and ship recycling advisory services to shipowners, managers, and yards worldwide.",
      },
      {
        property: "og:title",
        content: "SOS India — Maritime & Ship Recycling Consultancy",
      },
      {
        property: "og:description",
        content:
          "Trusted maritime and ship recycling advisory for shipowners, managers, and yards.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  const latest = [...ARTICLES]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    .slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-b from-accent/40 to-background">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Maritime & Ship Recycling Consultancy
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-foreground md:text-5xl">
            Clarity, compliance, and confidence across the vessel lifecycle.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            SOS India works with shipowners, managers, and recycling yards to
            navigate regulation, reduce risk, and operate responsibly — from
            day-one operations to safe end-of-life recycling.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/insights"
              className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Read latest insights
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#"
              className="inline-flex h-11 items-center rounded-md border border-border bg-background px-5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              Our services
            </a>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: FileCheck2,
              title: "Regulatory advisory",
              text: "IMO, MARPOL, SOLAS, and EU SRR guidance translated into practical, fleet-ready actions.",
            },
            {
              icon: Recycle,
              title: "Ship recycling",
              text: "End-to-end support for HKC and EU SRR compliant recycling, yard selection, and IHM management.",
            },
            {
              icon: ShieldCheck,
              title: "Compliance & safety",
              text: "Port State Control readiness, safety audits, and documentation programs your crews can actually use.",
            },
          ].map((c) => (
            <div
              key={c.title}
              className="rounded-lg border border-border bg-card p-6"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-accent text-primary">
                <c.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-foreground">
                {c.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {c.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Latest insights */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-primary">
                Latest insights
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                Maritime intelligence, straight from the desk
              </h2>
            </div>
            <Link
              to="/insights"
              className="hidden text-sm font-medium text-primary hover:underline md:inline"
            >
              View all →
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
          <div className="mt-8 md:hidden">
            <Link
              to="/insights"
              className="text-sm font-medium text-primary hover:underline"
            >
              View all insights →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
