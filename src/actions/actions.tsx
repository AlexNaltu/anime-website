import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

export const getPosts = async () => {
  try {
    const posts =
      await client.fetch(groq`*[_type == "post"] | order(publishedAt desc) {
              title,
              slug,
              description,
              publishedAt,
            }`);

    return posts;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
