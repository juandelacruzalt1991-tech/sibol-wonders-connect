import { Link } from "@tanstack/react-router";
import { Heart, Facebook, Instagram, Youtube, Mail } from "lucide-react";
import { STUDIO_URL } from "@/lib/sanity";

import logo from "../assets/logo.jpg";

const TiktokIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);
export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-5 py-12 grid gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src={logo} alt="Sibol Wonders" className="h-16 w-auto object-contain rounded-full border border-black/5" />
            <h3 className="font-display font-bold text-xl">Sibol Wonders</h3>
          </div>
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
          <div className="mt-3 flex flex-wrap items-center gap-2">
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
              href="https://www.instagram.com/thesibolprojectph"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 grid place-items-center rounded-full bg-card border border-border hover:bg-accent"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://www.youtube.com/@TheSibolProjectPh"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="w-10 h-10 grid place-items-center rounded-full bg-card border border-border hover:bg-accent"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href="https://www.tiktok.com/@thesibolprojectph"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
              className="w-10 h-10 grid place-items-center rounded-full bg-card border border-border hover:bg-accent"
            >
              <TiktokIcon className="w-4 h-4" />
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
