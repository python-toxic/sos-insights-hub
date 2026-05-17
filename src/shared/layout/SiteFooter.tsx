export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-background sm:mt-24">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:px-8 md:py-12">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 md:gap-10">
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
