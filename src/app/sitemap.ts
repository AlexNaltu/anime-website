import { getPosts } from "@/actions/actions";
import { IPost } from "@/types/types";

export default async function sitemap() {
  const baseUrl = "https://myanimenews.com";

  const fetchProducts = await getPosts();

  const products = fetchProducts.success.map((post: IPost) => {
    return {
      url: `${baseUrl}/products/${post.slug}`,
      lastModified: post.publishedAt,
    };
  });

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...products,
  ];
}
