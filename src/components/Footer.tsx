import { Link } from "@tanstack/react-router";
import { Heart, Facebook, Instagram, Mail } from "lucide-react";
import { STUDIO_URL } from "@/lib/sanity";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-5 py-12 grid gap-10 md:grid-cols-3">
        <div>
          <h3 className="font-display font-bold text-xl">Sibol Wonders</h3>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">
            A safe space for autism awareness, support, and community connection.
          </p>
          <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
            Made with <Heart className="w-4 h-4 text-primary" aria-hidden /> for our families.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <Link to="/about" className="text-muted-foreground hover:text-foreground">About</Link>
          <Link to="/stories" className="text-muted-foreground hover:text-foreground">Stories</Link>
          <Link to="/resources" className="text-muted-foreground hover:text-foreground">Resources</Link>
          <Link to="/events" className="text-muted-foreground hover:text-foreground">Events</Link>
          <Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link>
          <a
            href={STUDIO_URL}
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            Admin Studio
          </a>
        </div>

        <div>
          <p className="text-sm font-semibold">Stay close to us</p>
          <div className="mt-3 flex items-center gap-2">
            <a
              href="https://www.facebook.com/TheSibolProjectPh"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="w-10 h-10 grid place-items-center rounded-full bg-card border border-border hover:bg-accent"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              className="w-10 h-10 grid place-items-center rounded-full bg-card border border-border hover:bg-accent"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="mailto:hello@sibolwonders.org"
              aria-label="Email"
              className="w-10 h-10 grid place-items-center rounded-full bg-card border border-border hover:bg-accent"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Sibol Wonders. A community of care.
      </div>
    </footer>
  );
}
