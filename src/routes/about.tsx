import { createFileRoute } from "@tanstack/react-router";
import { Heart, Users, Sparkles } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Sibol Wonders" },
      { name: "description", content: "Our mission is to create a warm, accessible community for autism families through stories, resources, and gentle support." },
      { property: "og:title", content: "About Sibol Wonders" },
      { property: "og:description", content: "A community of care for autism families." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16 md:py-24">
      <p className="text-sm font-semibold uppercase tracking-wider text-primary">About us</p>
      <h1 className="mt-3 text-4xl md:text-5xl font-display font-bold">
        Growing wonder, one family at a time.
      </h1>
      <p className="mt-6 text-lg text-muted-foreground">
        <em>Sibol</em> means "to sprout" — the gentle beginning of something growing. Sibol Wonders is a community
        space built around the small, brave moments of autism families. We believe in slow listening, joyful
        difference, and the quiet power of being understood.
      </p>

      <div className="mt-12 grid md:grid-cols-3 gap-6">
        <div className="card-soft p-6">
          <Heart className="w-6 h-6 text-primary" />
          <h3 className="mt-3 font-display font-bold text-lg">Warmth first</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Every interaction is rooted in empathy. No clinical labels, no judgment — only care.
          </p>
        </div>
        <div className="card-soft p-6">
          <Users className="w-6 h-6 text-primary" />
          <h3 className="mt-3 font-display font-bold text-lg">Community-led</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Built with parents, autistic adults, educators, and therapists who walk this path daily.
          </p>
        </div>
        <div className="card-soft p-6">
          <Sparkles className="w-6 h-6 text-primary" />
          <h3 className="mt-3 font-display font-bold text-lg">Wonder always</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            We celebrate every kind of mind — the lining-up, the spinning, the deep-feeling kind.
          </p>
        </div>
      </div>

      <div className="mt-16 card-soft p-8 md:p-10 bg-gradient-warm">
        <h2 className="text-2xl md:text-3xl font-display font-bold">What we do</h2>
        <ul className="mt-5 space-y-3 text-muted-foreground">
          <li>• Share real family stories that comfort, teach, and inspire.</li>
          <li>• Maintain a directory of trusted schools, therapy centers, and NGOs.</li>
          <li>• Host gentle, sensory-friendly events for families and caregivers.</li>
          <li>• Provide a kind first point of contact for newly diagnosed families.</li>
        </ul>
      </div>
    </div>
  );
}
