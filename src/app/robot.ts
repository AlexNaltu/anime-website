import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://myanimenews.com";
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/posts", "/posts/*"],
      disallow: [],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
