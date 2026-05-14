import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const sanityClient = createClient({
  projectId: "pnktn249",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

type SanityImageSource = Parameters<ReturnType<typeof imageUrlBuilder>["image"]>[0];

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export const STUDIO_URL = "https://sibol-wonders.sanity.studio/";

export type Story = {
  _id: string;
  title: string;
  slug: { current: string };
  preview?: string;
  image?: SanityImageSource;
  author?: string;
  publishedAt?: string;
  body?: unknown;
};

export type EventDoc = {
  _id: string;
  name: string;
  date?: string;
  location?: string;
  description?: string;
  image?: SanityImageSource;
  registrationLink?: string;
};

export type ResourceDoc = {
  _id: string;
  name: string;
  category?: "school" | "therapy" | "ngo";
  description?: string;
  contact?: string;
  location?: string;
  website?: string;
};

export type HomePageDoc = {
  _id: string;
  heroMedia?: {
    mediaType?: "image" | "slideshow" | "video";
    singleImage?: SanityImageSource;
    slideshow?: SanityImageSource[];
    videoUrl?: string;
  };
};
