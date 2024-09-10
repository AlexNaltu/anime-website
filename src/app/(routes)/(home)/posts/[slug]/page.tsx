import { getPostBySlug } from "@/actions/actions";
import PostPage from "@/components/posts/post-page";
import { getQueryClient } from "@/lib/query";
import { IPost } from "@/types/types";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";

const PostSlugPage = async ({ params }: { params: { slug: string } }) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["post", params.slug],
    queryFn: async () => {
      const post = await getPostBySlug({ slug: params.slug });
      if (post.error) throw new Error(post.error);
      return post.success;
    },
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PostPage slug={params.slug} />
      </HydrationBoundary>
    </div>
  );
};

export default PostSlugPage;
