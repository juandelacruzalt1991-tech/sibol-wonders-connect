import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { HomePageDoc, urlFor } from "@/lib/sanity";

export function HeroMedia({ media, fallbackImg }: { media?: HomePageDoc["heroMedia"]; fallbackImg: string }) {
  const [emblaRef] = useEmblaCarousel({ loop: true });

  if (!media) {
    return (
      <img
        src={fallbackImg}
        alt="A diverse group of families and children holding hands in a sunlit meadow"
        width={1536}
        height={1024}
        className="relative rounded-[2rem] shadow-glow w-full h-auto object-cover"
      />
    );
  }

  if (media.mediaType === "video" && media.videoUrl) {
    return (
      <video
        src={media.videoUrl}
        autoPlay
        muted
        loop
        playsInline
        className="relative rounded-[2rem] shadow-glow w-full h-auto object-cover"
      />
    );
  }

  if (media.mediaType === "slideshow" && media.slideshow && media.slideshow.length > 0) {
    return (
      <div className="overflow-hidden relative rounded-[2rem] shadow-glow w-full" ref={emblaRef}>
        <div className="flex">
          {media.slideshow.map((img, i) => (
            <div className="flex-[0_0_100%] min-w-0 relative" key={i}>
              <img
                src={urlFor(img).width(1536).height(1024).url()}
                alt={`Slideshow image ${i + 1}`}
                className="w-full h-auto object-cover rounded-[2rem]"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default to single image or fallback
  const imgSrc = media.singleImage 
    ? urlFor(media.singleImage).width(1536).height(1024).url() 
    : fallbackImg;

  return (
    <img
      src={imgSrc}
      alt="Hero image"
      width={1536}
      height={1024}
      className="relative rounded-[2rem] shadow-glow w-full h-auto object-cover"
    />
  );
}
