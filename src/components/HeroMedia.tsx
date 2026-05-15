import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { HomePageDoc, urlFor } from "@/lib/sanity";

export function HeroMedia({ media, fallbackImg }: { media?: HomePageDoc["heroMedia"]; fallbackImg: string }) {
  const [emblaRef] = useEmblaCarousel({ loop: true });

  const containerClass = "relative rounded-[2rem] shadow-glow w-full aspect-[3/2] overflow-hidden bg-muted";
  const mediaClass = "w-full h-full object-cover";

  if (!media) {
    return (
      <div className={containerClass}>
        <img
          src={fallbackImg}
          alt="A diverse group of families and children holding hands in a sunlit meadow"
          width={1536}
          height={1024}
          className={mediaClass}
        />
      </div>
    );
  }

  if (media.mediaType === "video" && media.videoUrl) {
    return (
      <div className={containerClass}>
        <video
          src={media.videoUrl}
          autoPlay
          muted
          loop
          playsInline
          className={mediaClass}
        />
      </div>
    );
  }

  if (media.mediaType === "slideshow" && media.slideshow && media.slideshow.length > 0) {
    return (
      <div className={containerClass} ref={emblaRef}>
        <div className="flex h-full">
          {media.slideshow.map((img, i) => (
            <div className="flex-[0_0_100%] min-w-0 relative h-full" key={i}>
              <img
                src={urlFor(img).width(1536).height(1024).url()}
                alt={`Slideshow image ${i + 1}`}
                className={mediaClass}
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
    <div className={containerClass}>
      <img
        src={imgSrc}
        alt="Hero image"
        width={1536}
        height={1024}
        className={mediaClass}
      />
    </div>
  );
}
