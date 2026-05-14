import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { MapPin, Phone, ExternalLink } from "lucide-react";
import { sanityClient, type ResourceDoc } from "@/lib/sanity";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources — Sibol Wonders" },
      { name: "description", content: "Trusted directory of schools, therapy centers, and NGOs supporting autism families." },
      { property: "og:title", content: "Resources Directory — Sibol Wonders" },
      { property: "og:description", content: "Schools, therapy centers, and NGOs for autism families." },
    ],
  }),
  component: ResourcesPage,
});

const tabs = [
  { id: "all", label: "All" },
  { id: "school", label: "Schools" },
  { id: "therapy", label: "Therapy" },
  { id: "ngo", label: "NGOs" },
] as const;

function ResourcesPage() {
  const [filter, setFilter] = useState<(typeof tabs)[number]["id"]>("all");
  const { data, isLoading } = useQuery<ResourceDoc[]>({
    queryKey: ["resources"],
    queryFn: () =>
      sanityClient.fetch(
        `*[_type == "resource"] | order(name asc){ _id, name, category, description, contact, location, website }`
      ),
  });

  const filtered = (data ?? []).filter((r) => filter === "all" || r.category === filter);

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
      <p className="text-sm font-semibold uppercase tracking-wider text-primary">Resources</p>
      <h1 className="mt-3 text-4xl md:text-5xl font-display font-bold">A directory you can trust</h1>
      <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
        Schools, therapy centers, and NGOs recommended by our community. Always reach out directly to confirm fit.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setFilter(t.id)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
              filter === t.id
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-muted-foreground border-border hover:bg-secondary"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {isLoading && Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="card-soft h-44 animate-pulse" />
        ))}
        {filtered.map((r) => (
          <div key={r._id} className="card-soft p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold capitalize">
                  {r.category}
                </span>
                <h3 className="mt-3 font-display font-bold text-xl">{r.name}</h3>
              </div>
            </div>
            {r.description && <p className="mt-3 text-sm text-muted-foreground">{r.description}</p>}
            <div className="mt-4 space-y-1.5 text-sm text-muted-foreground">
              {r.location && (
                <p className="inline-flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {r.location}</p>
              )}
              {r.contact && (
                <p className="inline-flex items-center gap-1.5"><Phone className="w-4 h-4" /> {r.contact}</p>
              )}
            </div>
            {r.website && (
              <a
                href={r.website}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2 transition-all"
              >
                Visit website <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        ))}
        {!isLoading && filtered.length === 0 && (
          <p className="text-muted-foreground">No resources in this category yet.</p>
        )}
      </div>
    </div>
  );
}
