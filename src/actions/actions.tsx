import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

interface SlugProps {
  slug: string;
}

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

export const getLatestNews = async () => {
  try {
    const latestNews =
      await client.fetch(groq`*[_type == "post" && "News" in categories[]->title] | order(publishedAt desc) {
              _id,
              title,
              "slug": slug.current,
              description,
              publishedAt,
              readingTime,
              "mainImage": mainImage.asset->url,
              "category": categories[]->{
                title
              }
            }`);

    return latestNews;
  } catch (error: any) {
    throw new Error("An error occurred while fetching latest news");
  }
};

export const getPostBySlug = async ({ slug }: SlugProps) => {
  try {
    const post = await client.fetch(
      groq`*[_type == "post" && slug.current == "${slug}"][0] {
       _id,
       title,
       "slug": slug.current,
       description,
       publishedAt,
       readingTime,
       "mainImage": mainImage.asset->url,
       "category": categories[]->{
       title
      }
    }`
    );

    return post;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
