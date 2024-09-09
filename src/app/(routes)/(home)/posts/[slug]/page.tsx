import { getQueryClient } from "@/lib/query";
import React from "react";

const PostPage = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const posts = await getPosts();
      if (posts.error) throw new Error(posts.error);
      return posts.success;
    },
  });
  return <div>PostPage</div>;
};

export default PostPage;
