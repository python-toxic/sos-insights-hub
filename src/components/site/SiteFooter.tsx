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
              Get in touch
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              For consultancy, compliance support, or recycling advisory,
              reach our team directly.
            </p>
            <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
              <li>
                <span className="text-foreground">Email:</span>{" "}
                info@sosindia.in
              </li>
              <li>
                <span className="text-foreground">Office:</span>{" "}
                Mumbai, India
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} SOS India. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
