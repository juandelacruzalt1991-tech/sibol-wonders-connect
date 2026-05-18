import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { sanityClient, type EventDoc } from "@/lib/sanity";

export const Route = createFileRoute("/events")({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData({
      queryKey: ["events"],
      queryFn: () =>
        sanityClient.fetch(
          `*[_type == "event"] | order(date asc){ _id, name, date, location, description, registrationLink, image }`
        ),
    });
  },
  head: () => ({
    meta: [
      { title: "Events — Sibol Wonders" },
      { name: "description", content: "Sensory-friendly gatherings, workshops, and community events for autism families." },
      { property: "og:title", content: "Upcoming Events — Sibol Wonders" },
      { property: "og:description", content: "Gentle gatherings for our community." },
    ],
  }),
  component: EventsPage,
});

function EventsPage() {
  const { data: events, isLoading } = useQuery<EventDoc[]>({
    queryKey: ["events"],
    queryFn: () =>
      sanityClient.fetch(
        `*[_type == "event"] | order(date asc){ _id, name, date, location, description, registrationLink, image }`
      ),
  });

  return (
    <div className="mx-auto max-w-5xl px-5 py-16 md:py-20">
      <p className="text-sm font-semibold uppercase tracking-wider text-primary">Events</p>
      <h1 className="mt-3 text-4xl md:text-5xl font-display font-bold">Gentle gatherings</h1>
      <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
        Spaces designed for autism families — quiet zones, flexible schedules, and warm welcomes.
      </p>

      <div className="mt-12 space-y-5">
        {isLoading && Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="card-soft h-32 animate-pulse" />
        ))}
        {events?.map((e) => (
          <article key={e._id} className="card-soft p-6 md:p-8 grid md:grid-cols-[auto_1fr_auto] gap-6 items-start">
            <div className="text-center bg-gradient-warm rounded-2xl px-5 py-3 min-w-[88px]">
              <p className="text-xs font-semibold uppercase tracking-wider text-foreground/70">
                {e.date && new Date(e.date).toLocaleDateString(undefined, { month: "short" })}
              </p>
              <p className="text-2xl font-display font-bold">
                {e.date && new Date(e.date).getDate()}
              </p>
            </div>

            <div>
              <h3 className="font-display font-bold text-2xl">{e.name}</h3>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                {e.date && (
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {new Date(e.date).toLocaleString(undefined, { dateStyle: "long", timeStyle: "short" })}
                  </span>
                )}
                {e.location && (
                  <span className="inline-flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {e.location}</span>
                )}
              </div>
              {e.description && <p className="mt-3 text-muted-foreground">{e.description}</p>}
            </div>

            {e.registrationLink && (
              <a
                href={e.registrationLink}
                target="_blank"
                rel="noreferrer"
                className="btn-primary text-sm whitespace-nowrap self-center"
              >
                Register <ArrowRight className="w-4 h-4" />
              </a>
            )}
          </article>
        ))}
        {!isLoading && events?.length === 0 && (
          <p className="text-muted-foreground">No upcoming events. Stay tuned.</p>
        )}
      </div>
    </div>
  );
}
