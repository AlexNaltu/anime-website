import { getPosts } from "@/actions/actions";
import Filters from "@/components/filters/filters";
import Newsletter from "@/components/newsletter/newsletter";
import LatestNews from "@/components/posts/latest-news";
import Posts from "@/components/posts/posts";
import TestPosts from "@/components/posts/test-posts";
import { getQueryClient } from "@/lib/query";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function Home() {
  // Prefetch the posts data
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const posts = await getPosts();
      if (posts.error) throw new Error(posts.error);
      return posts.success;
    },
  });

  return (
    <div>
      <Filters />
      <div className="md:flex justify-between max-w-[1300px] mx-auto">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <TestPosts />
          <Posts />
        </HydrationBoundary>
        <div className="flex flex-col my-5 mx-2">
          <h1 className="font-black text-xl mb-2">Categories</h1>
          <Filters className="flex flex-col gap-2 px-0" />
          <LatestNews />
          <Newsletter />
        </div>
      </div>
    </div>
  );
}
