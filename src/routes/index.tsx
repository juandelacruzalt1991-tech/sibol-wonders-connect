import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, BookOpen, Calendar, HeartHandshake, MapPin, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-families.jpg";
import logo from "@/assets/logo.jpg";
import { sanityClient, urlFor, type Story, type EventDoc, type ResourceDoc, type HomePageDoc } from "@/lib/sanity";
import { StoryCard } from "@/components/StoryCard";
import { HeroMedia } from "@/components/HeroMedia";
import { eventFallback, resourceFallback } from "@/lib/fallbacks";

export const Route = createFileRoute("/")({
  loader: async ({ context: { queryClient } }) => {
    await Promise.all([
      queryClient.ensureQueryData({
        queryKey: ["homePage"],
        queryFn: () =>
          sanityClient.fetch(
            `*[_type == "homePage"][0]{
              _id,
              heroMedia {
                mediaType,
                singleImage,
                slideshow,
                "videoUrl": videoUrl.asset->url
              }
            }`
          ),
      }),
      queryClient.ensureQueryData({
        queryKey: ["stories", "preview"],
        queryFn: () =>
          sanityClient.fetch(
            `*[_type == "story"] | order(publishedAt desc)[0...3]{ _id, title, slug, preview, image, author }`
          ),
      }),
      queryClient.ensureQueryData({
        queryKey: ["events", "preview"],
        queryFn: () =>
          sanityClient.fetch(
            `*[_type == "event"] | order(date asc)[0...3]{ _id, name, date, location, description, image }`
          ),
      }),
      queryClient.ensureQueryData({
        queryKey: ["resources", "preview"],
        queryFn: () =>
          sanityClient.fetch(
            `*[_type == "resource"] | order(_createdAt desc)[0...3]{ _id, name, category, description, location }`
          ),
      }),
    ]);
  },
  head: () => ({
    meta: [
      { title: "Sibol Wonders — A Safe Space for Autism Families" },
      { name: "description", content: "Autism awareness, family stories, resources, and community events. Sibol Wonders is a warm space where families feel understood." },
    ],
  }),
  component: Home,
});

function Home() {
  const { data: homePage } = useQuery<HomePageDoc>({
    queryKey: ["homePage"],
    queryFn: () =>
      sanityClient.fetch(
        `*[_type == "homePage"][0]{
          _id,
          heroMedia {
            mediaType,
            singleImage,
            slideshow,
            "videoUrl": videoUrl.asset->url
          }
        }`
      ),
  });

  const { data: stories } = useQuery<Story[]>({
    queryKey: ["stories", "preview"],
    queryFn: () =>
      sanityClient.fetch(
        `*[_type == "story"] | order(publishedAt desc)[0...3]{ _id, title, slug, preview, image, author }`
      ),
  });

  const { data: events } = useQuery<EventDoc[]>({
    queryKey: ["events", "preview"],
    queryFn: () =>
      sanityClient.fetch(
        `*[_type == "event"] | order(date asc)[0...3]{ _id, name, date, location, description, image }`
      ),
  });

  const { data: resources } = useQuery<ResourceDoc[]>({
    queryKey: ["resources", "preview"],
    queryFn: () =>
      sanityClient.fetch(
        `*[_type == "resource"] | order(_createdAt desc)[0...3]{ _id, name, category, description, location }`
      ),
  });

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-hero">
        <div className="mx-auto max-w-7xl px-5 py-16 md:py-24 grid md:grid-cols-[1fr_1.3fr] gap-10 items-center">
          <div className="fade-up">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card/70 border border-border text-xs font-semibold text-primary">
              <img src={logo} alt="" className="w-6 h-6 object-contain rounded-full border border-black/5" /> Welcome to our community
            </span>
            <h1 className="mt-5 text-4xl md:text-6xl font-display font-bold leading-tight">
              Sibol <span className="text-primary">Wonders</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-md">
              A safe space for autism awareness, support, and community connection.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/stories" className="btn-primary">
                Explore Stories <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/contact" className="btn-ghost">Get Support</Link>
            </div>
          </div>

          <div className="fade-up">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-warm rounded-[2.5rem] opacity-60 blur-2xl" aria-hidden />
              <HeroMedia media={homePage?.heroMedia} fallbackImg={heroImg} />
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid md:grid-cols-[1fr_2fr] gap-10 items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Our mission</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">A community that listens, gently.</h2>
          </div>
          <div className="space-y-4 text-lg text-muted-foreground">
            <p>
              Sibol Wonders is a Filipino-rooted community for autism families — a place where stories are heard,
              questions are welcomed, and no one walks the journey alone.
            </p>
            <p>
              We share lived experiences, point families toward trusted resources, and create gentle spaces where
              every kind of child can wonder, play, and grow.
            </p>
          </div>
        </div>
      </section>

      {/* Stories preview */}
      <section className="mx-auto max-w-6xl px-5 py-10">
        <SectionHeading
          eyebrow="Family stories"
          title="Real journeys, told with love"
          link="/stories"
          linkLabel="All stories"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {stories?.map((s) => <StoryCard key={s._id} story={s} />)}
          {!stories && <SkeletonRow />}
        </div>
      </section>

      {/* Awareness */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="card-soft p-8 md:p-12 bg-gradient-warm">
          <p className="text-sm font-semibold uppercase tracking-wider text-foreground/60">What is autism?</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold max-w-2xl">
            Autism is a different way of experiencing the world — not less, just different.
          </h2>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <FactCard
              title="Early signs"
              text="Differences in eye contact, response to name, repetitive movements, and sensory sensitivities can appear in the first years."
            />
            <FactCard
              title="Common myths"
              text="Autism is not caused by parenting, vaccines, or screens. Autistic people feel deeply, even when they show it differently."
            />
            <FactCard
              title="How to help"
              text="Listen first. Make space. Celebrate small wins. Connect families with patient, qualified support."
            />
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="mx-auto max-w-6xl px-5 py-10">
        <SectionHeading
          eyebrow="Upcoming"
          title="Gentle gatherings & events"
          link="/events"
          linkLabel="See all events"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {events?.map((e) => (
            <div key={e._id} className="card-soft overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden bg-gradient-warm">
                <img 
                  src={e.image ? urlFor(e.image).width(800).height(600).fit("crop").url() : eventFallback(e._id)} 
                  alt={e.name} 
                  loading="lazy" 
                  width={800} 
                  height={600} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-primary text-sm font-semibold">
                  <Calendar className="w-4 h-4" />
                  {e.date && new Date(e.date).toLocaleDateString(undefined, { dateStyle: "long" })}
                </div>
                <h3 className="mt-3 font-display font-bold text-xl">{e.name}</h3>
                {e.location && (
                  <p className="mt-2 text-sm text-muted-foreground inline-flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" /> {e.location}
                  </p>
                )}
                {e.description && <p className="mt-3 text-sm text-muted-foreground line-clamp-3">{e.description}</p>}
              </div>
            </div>
          ))}
          {!events && <SkeletonRow />}
        </div>
      </section>

      {/* Resources */}
      <section className="mx-auto max-w-6xl px-5 py-10">
        <SectionHeading
          eyebrow="Helpful directory"
          title="Schools, therapy & support"
          link="/resources"
          linkLabel="Browse resources"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {resources?.map((r) => (
            <div key={r._id} className="card-soft overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden bg-gradient-warm">
                <img src={resourceFallback(r.category)} alt={r.name} loading="lazy" width={800} height={600} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold capitalize">
                  {r.category}
                </span>
                <h3 className="mt-3 font-display font-bold text-xl">{r.name}</h3>
                {r.location && (
                  <p className="mt-2 text-sm text-muted-foreground inline-flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" /> {r.location}
                  </p>
                )}
                {r.description && <p className="mt-3 text-sm text-muted-foreground line-clamp-3">{r.description}</p>}
              </div>
            </div>
          ))}
          {!resources && <SkeletonRow />}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="card-soft p-10 md:p-16 text-center bg-gradient-warm">
          <HeartHandshake className="w-10 h-10 mx-auto text-primary" />
          <h2 className="mt-4 text-3xl md:text-4xl font-display font-bold">
            You don't have to walk this journey alone.
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Join our community of families, educators, and friends. We're here whenever you need us.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link to="/contact" className="btn-primary">
              Join Our Community <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/stories" className="btn-ghost">
              <BookOpen className="w-4 h-4" /> Read Stories
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionHeading({
  eyebrow, title, link, linkLabel,
}: { eyebrow: string; title: string; link: "/stories" | "/events" | "/resources"; linkLabel: string }) {
  return (
    <div className="flex items-end justify-between gap-4 flex-wrap">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">{eyebrow}</p>
        <h2 className="mt-2 text-3xl md:text-4xl font-display font-bold">{title}</h2>
      </div>
      <Link to={link} className="text-sm font-semibold text-primary inline-flex items-center gap-1 hover:gap-2 transition-all">
        {linkLabel} <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

function FactCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl bg-card/80 backdrop-blur p-6 border border-border">
      <h3 className="font-display font-bold text-lg">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{text}</p>
    </div>
  );
}

function SkeletonRow() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="card-soft p-6 animate-pulse h-56" />
      ))}
    </>
  );
}
