import { getPosts } from "@/actions/actions";
import FilteredPosts from "@/components/posts/filtered-posts";
import { getQueryClient } from "@/lib/query";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React, { Suspense } from "react";

const PostsPage = async () => {
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
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<p>Loading...</p>}>
          <FilteredPosts />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
};

export default PostsPage;
