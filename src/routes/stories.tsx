import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { sanityClient, type Story } from "@/lib/sanity";
import { StoryCard } from "@/components/StoryCard";

export const Route = createFileRoute("/stories")({
  head: () => ({
    meta: [
      { title: "Stories — Sibol Wonders" },
      { name: "description", content: "Real stories from autism families — moments of growth, joy, and discovery." },
      { property: "og:title", content: "Family Stories — Sibol Wonders" },
      { property: "og:description", content: "Real stories from our community." },
    ],
  }),
  component: StoriesPage,
});

function StoriesPage() {
  const { data: stories, isLoading } = useQuery<Story[]>({
    queryKey: ["stories", "all"],
    queryFn: () =>
      sanityClient.fetch(
        `*[_type == "story"] | order(publishedAt desc){ _id, title, slug, preview, image, author, publishedAt }`
      ),
  });

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
      <p className="text-sm font-semibold uppercase tracking-wider text-primary">Family stories</p>
      <h1 className="mt-3 text-4xl md:text-5xl font-display font-bold">Stories from our community</h1>
      <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
        Honest, hopeful, and human. Every story here is a small act of courage from families like yours.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading && Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="card-soft h-80 animate-pulse" />
        ))}
        {stories?.map((s) => <StoryCard key={s._id} story={s} />)}
        {stories?.length === 0 && (
          <p className="text-muted-foreground">No stories yet. Check back soon.</p>
        )}
      </div>
    </div>
  );
}
