import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

interface SlugProps {
  slug: string;
}

interface RelatedPostsProps {
  category: string;
  tags: string[];
}

// get all posts
export const getPosts = async () => {
  try {
    const data =
      await client.fetch(groq`*[_type == "post"] | order(publishedAt desc)[0...15] {
              _id,
              title,
              "slug": slug.current,
              description,
              publishedAt,
              readingTime,
              "mainImage": mainImage.asset->url,
              "category": categories[]->{
                title
              },
              "tags": tags[]->{
              tag
              },
            }`);

    return { success: data };
  } catch (error: any) {
    return { error: "An error occurred while fetching posts" };
  }
};

// get latest news
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
              },
              "tags": tags[]->{
              tag
              },
            }`);

    return latestNews;
  } catch (error: any) {
    throw new Error("An error occurred while fetching latest news");
  }
};

// get post by slug
export const getPostBySlug = async ({ slug }: SlugProps) => {
  try {
    const post = await client.fetch(
      groq`*[_type == "post" && slug.current == "${slug}"][0] {
       _id,
       title,
       "slug": slug.current,
       description,
       publishedAt,
       body,
       readingTime,
       "mainImage": mainImage.asset->url,
       "category": categories[]->{
       title,
       },
       "tags": tags[]->{
       tag
       },
       "comments": *[_type == "comment" && post._ref == ^._id ] | order(_createdAt desc) {
        name,
        comment,
        _createdAt,
        _id,
     }
    }`
    );

    if (!post) {
      throw new Error("Post not found");
    }

    return post;
  } catch (error: any) {
    console.error("Error fetching post:", error.message);

    throw new Error(error.message);
  }
};

// related posts based on category and tags
export const getRelatedPosts = async ({
  category,
  tags,
}: RelatedPostsProps) => {
  try {
    const relatedPosts = await client.fetch(
      groq`*[_type == "post" && $category in categories[]->title && count((tags[]->tag)[@ in $tags]) > 0] {
       _id,
       title,
       "slug": slug.current,
       description,
       publishedAt,
       body,
       readingTime,
       "mainImage": mainImage.asset->url,
       "category": categories[]->{
       title
       },
       "tags": tags[]->{
       tag
       },
    }`,
      { category, tags }
    );

    if (!relatedPosts) {
      throw new Error("Post not found");
    }

    return relatedPosts;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
