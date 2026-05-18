import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PortableText } from "@portabletext/react";
import { ArrowLeft } from "lucide-react";
import { sanityClient, urlFor, type Story } from "@/lib/sanity";

export const Route = createFileRoute("/stories/$slug")({
  loader: async ({ context: { queryClient }, params: { slug } }) => {
    await queryClient.ensureQueryData({
      queryKey: ["story", slug],
      queryFn: () =>
        sanityClient.fetch(
          `*[_type == "story" && slug.current == $slug][0]{ _id, title, slug, preview, image, author, publishedAt, body }`,
          { slug }
        ),
    });
  },
  head: () => ({
    meta: [
      { title: "Story — Sibol Wonders" },
      { name: "description", content: "A family story shared with the Sibol Wonders community." },
    ],
  }),
  component: StoryPage,
});

function StoryPage() {
  const { slug } = Route.useParams();
  const { data: story, isLoading } = useQuery<Story | null>({
    queryKey: ["story", slug],
    queryFn: () =>
      sanityClient.fetch(
        `*[_type == "story" && slug.current == $slug][0]{ _id, title, slug, preview, image, author, publishedAt, body }`,
        { slug }
      ),
  });

  if (isLoading) {
    return <div className="mx-auto max-w-3xl px-5 py-20 animate-pulse h-96" />;
  }
  if (!story && !isLoading) throw notFound();


  return (
    <article className="mx-auto max-w-3xl px-5 py-12 md:py-20">
      <Link to="/stories" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2 transition-all">
        <ArrowLeft className="w-4 h-4" /> Back to stories
      </Link>

      <h1 className="mt-6 text-3xl md:text-5xl font-display font-bold">{story.title}</h1>
      {story.author && (
        <p className="mt-3 text-sm uppercase tracking-wide text-primary font-semibold">
          By {story.author}
          {story.publishedAt && ` · ${new Date(story.publishedAt).toLocaleDateString(undefined, { dateStyle: "long" })}`}
        </p>
      )}

      {story.image && (
        <img
          src={urlFor(story.image).width(1200).height(700).fit("crop").url()}
          alt={story.title}
          width={1200}
          height={700}
          className="mt-8 rounded-3xl w-full h-auto object-cover shadow-soft"
        />
      )}

      <div className="prose prose-lg mt-10 max-w-none text-foreground/90 leading-relaxed">
        {story.body ? (
          <PortableText value={story.body as never} />
        ) : (
          <p className="text-muted-foreground">{story.preview}</p>
        )}
      </div>
    </article>
  );
}
