import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.jpg";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/stories", label: "Stories" },
  { to: "/resources", label: "Resources" },
  { to: "/events", label: "Events" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border/60">
      <div className="mx-auto max-w-6xl px-5 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center font-display font-bold text-lg">
          <img src={logo} alt="Sibol Wonders" className="h-16 w-auto object-contain rounded-full border border-black/5" />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="px-3 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary"
              activeProps={{ className: "px-3 py-2 rounded-full text-sm font-medium text-foreground bg-secondary" }}
            >
              {l.label}
            </Link>
          ))}
          <Link to="/contact" className="ml-2 btn-primary text-sm py-2 px-4">
            Get Support
          </Link>
        </nav>

        <button
          className="md:hidden p-2 rounded-full hover:bg-secondary"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden px-5 pb-5 flex flex-col gap-1 border-t border-border/60 bg-background">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              activeOptions={{ exact: l.to === "/" }}
              className="px-4 py-3 rounded-2xl text-base font-medium text-muted-foreground hover:bg-secondary"
              activeProps={{ className: "px-4 py-3 rounded-2xl text-base font-medium text-foreground bg-secondary" }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
