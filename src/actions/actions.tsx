import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

export const getPosts = async () => {
  try {
    const data =
      await client.fetch(groq`*[_type == "post"] | order(publishedAt desc) {
              _id,
              title,
              "slug": slug.current,
              description,
              publishedAt,
              readingTime,
              "mainImage": mainImage.asset->url,
            }`);

    return { success: data };
  } catch (error: any) {
    return { error: "An error occurred while fetching posts" };
  }
};
