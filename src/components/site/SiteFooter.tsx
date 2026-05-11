export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-5 py-12 md:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="text-base font-semibold text-foreground">
              SOS India
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Maritime consultancy and ship recycling advisory — helping owners,
              managers, and yards operate with clarity and compliance.
            </p>
          </div>
          <div>
            <div className="text-sm font-medium text-foreground">Company</div>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-medium text-foreground">
              Stay informed
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Receive maritime and ship recycling insights directly in your
              inbox.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-4 flex gap-2"
            >
              <input
                type="email"
                placeholder="you@company.com"
                className="h-10 flex-1 rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-primary"
              />
              <button
                type="submit"
                className="h-10 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} SOS India. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
