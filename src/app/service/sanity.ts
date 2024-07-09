import ImageUrlBuilder from "@sanity/image-url";
import { createClient } from "@sanity/client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_PROJECT_DATASET,
  apiVersion: "2024-07-06",
  useCdn: false,
  token: process.env.SANITY_SECRET_TOKEN,
});

const builder = ImageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source).width(800).url();
}
