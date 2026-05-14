import { Link } from "@tanstack/react-router";
import { urlFor, type Story } from "@/lib/sanity";

export function StoryCard({ story }: { story: Story }) {
  return (
    <Link
      to="/stories/$slug"
      params={{ slug: story.slug.current }}
      className="card-soft overflow-hidden group block hover:-translate-y-1 transition-transform"
    >
      <div className="aspect-[4/3] bg-gradient-warm overflow-hidden">
        {story.image ? (
          <img
            src={urlFor(story.image).width(600).height(450).fit("crop").url()}
            alt={story.title}
            loading="lazy"
            width={600}
            height={450}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full grid place-items-center text-foreground/40 font-display text-2xl">
            ✿
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-display font-bold text-xl">{story.title}</h3>
        {story.preview && (
          <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{story.preview}</p>
        )}
        {story.author && (
          <p className="mt-4 text-xs uppercase tracking-wide text-primary font-semibold">
            By {story.author}
          </p>
        )}
      </div>
    </Link>
  );
}
