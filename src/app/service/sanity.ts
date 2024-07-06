import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_PROJECT_DATASET,
  apiVersion: "2024-07-06",
  useCdn: false,
  token: process.env.SANITY_SECRET_TOKEN,
});
