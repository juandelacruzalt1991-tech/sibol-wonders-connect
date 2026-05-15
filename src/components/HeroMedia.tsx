import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { sanityClient, urlFor } from "@/lib/sanity";
import heroFallback from "@/assets/hero-families.jpg";

type HeroData = {
  mediaType?: "image" | "slideshow" | "video";
  image?: { asset?: { _ref?: string }; alt?: string } | null;
  slideshow?: Array<{ _key?: string; asset?: { _ref?: string }; alt?: string }> | null;
  video?: { asset?: { url?: string } } | null;
  videoUrl?: string | null;
};

const QUERY = `*[_type == "heroSection"] | order(_updatedAt desc)[0]{
  mediaType,
  image{asset, alt},
  slideshow[]{_key, asset, alt},
  "video": video{asset->{url}},
  videoUrl
}`;

export function HeroMedia() {
  const { data } = useQuery<HeroData | null>({
    queryKey: ["heroSection"],
    queryFn: () => sanityClient.fetch(QUERY),
    refetchOnWindowFocus: true,
  });

  const wrapper = "relative rounded-[2rem] shadow-glow w-full aspect-[3/2] overflow-hidden";

  // Determine media type — auto-detect from provided fields if mediaType missing
  const slides = data?.slideshow?.filter((s) => s?.asset?._ref) ?? [];
  const hasImage = !!data?.image?.asset?._ref;
  const videoSrc = data?.video?.asset?.url || data?.videoUrl || null;

  let mode: "video" | "slideshow" | "image" = "image";
  if (data?.mediaType === "video" && videoSrc) mode = "video";
  else if (data?.mediaType === "slideshow" && slides.length > 1) mode = "slideshow";
  else if (data?.mediaType === "image" && hasImage) mode = "image";
  else if (videoSrc) mode = "video";
  else if (slides.length > 1) mode = "slideshow";
  else if (slides.length === 1 || hasImage) mode = "image";

  if (mode === "video" && videoSrc) {
    return (
      <div className={wrapper}>
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  if (mode === "slideshow" && slides.length > 0) {
    return (
      <div className={wrapper}>
        <Slideshow
          urls={slides.map((s) => urlFor(s).width(1200).height(800).fit("crop").url())}
          alts={slides.map((s) => s.alt || "Hero slide")}
        />
      </div>
    );
  }

  const src = hasImage
    ? urlFor(data!.image!).width(1200).height(800).fit("crop").url()
    : slides[0]
    ? urlFor(slides[0]).width(1200).height(800).fit("crop").url()
    : heroFallback;
  const alt = data?.image?.alt || "Sibol Wonders community";

  return (
    <div className={wrapper}>
      <img src={src} alt={alt} className="w-full h-full object-cover" loading="eager" />
    </div>
  );
}

function Slideshow({ urls, alts }: { urls: string[]; alts: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % urls.length), 4500);
    return () => clearInterval(t);
  }, [urls.length]);
  return (
    <>
      {urls.map((u, idx) => (
        <img
          key={u}
          src={u}
          alt={alts[idx]}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            idx === i ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {urls.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === i ? "bg-white w-6" : "bg-white/60"
            }`}
          />
        ))}
      </div>
    </>
  );
}
