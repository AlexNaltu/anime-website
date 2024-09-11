import { getPostBySlug, getPosts } from "@/actions/actions";
import PostPage from "@/components/posts/post-page";
import { getQueryClient } from "@/lib/query";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";

const PostSlugPage = async ({ params }: { params: { slug: string } }) => {
  // Prefetch the post data
  const queryClient = getQueryClient();
  const [post, relatedPosts] = await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["post", params.slug],
      queryFn: async () => {
        const post = await getPostBySlug({ slug: params.slug });
        console.log(post);
        if (post.error) throw new Error(post.error);
        return post;
      },
    }),
  ]);

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PostPage slug={params.slug} />
      </HydrationBoundary>
    </div>
  );
};

export default PostSlugPage;
