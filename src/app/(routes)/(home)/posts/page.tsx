import { getPosts } from "@/actions/actions";
import Posts from "@/components/posts/posts";
import { getQueryClient } from "@/lib/query";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";

const PostsPage = () => {
  return (
    <div>
      <Posts />
    </div>
  );
};

export default PostsPage;
