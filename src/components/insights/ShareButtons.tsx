import { Linkedin, Mail } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  title: string;
}

export function ShareButtons({ title }: Props) {
  const [url, setUrl] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") setUrl(window.location.href);
  }, []);

  const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  const mail = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`I thought you might find this useful: ${url}`)}`;

  return (
    <div className="mx-auto flex max-w-[68ch] flex-wrap items-center gap-3 border-y border-border py-6">
      <span className="text-sm font-medium text-muted-foreground">
        Share this article
      </span>
      <a
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-11 items-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent"
      >
        <Linkedin className="h-4 w-4" />
        LinkedIn
      </a>
      <a
        href={mail}
        className="inline-flex h-11 items-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent"
      >
        <Mail className="h-4 w-4" />
        Email
      </a>
    </div>
  );
}
