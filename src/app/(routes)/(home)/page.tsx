import { getPosts } from "@/actions/actions";
import Newsletter from "@/components/newsletter/newsletter";
import LatestNews from "@/components/posts/latest-news";
import Posts from "@/components/posts/posts";
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
      <div className="md:flex justify-between max-w-[1300px] mx-auto">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Posts />
        </HydrationBoundary>
        <div className="flex flex-col my-5 mx-2">
          <LatestNews />
          <Newsletter />
        </div>
      </div>
    </div>
  );
}
