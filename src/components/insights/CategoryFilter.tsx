import { CATEGORIES, type Category } from "@/data/insights";

interface Props {
  active: Category | "All";
  onChange: (c: Category | "All") => void;
}

export function CategoryFilter({ active, onChange }: Props) {
  const items: (Category | "All")[] = ["All", ...CATEGORIES];
  return (
    <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
      {items.map((cat) => {
        const isActive = cat === active;
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={`h-11 shrink-0 rounded-full border px-4 text-sm font-medium transition-colors ${
              isActive
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
