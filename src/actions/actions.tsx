import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

export const getPosts = async () => {
  try {
    const data =
      await client.fetch(groq`*[_type == "post"] | order(publishedAt desc) {
              title,
              slug,
              description,
              publishedAt,
            }`);

    return { success: data };
  } catch (error: any) {
    return { error: "An error occurred while fetching posts" };
  }
};
