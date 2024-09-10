"use client";
import { getPostBySlug } from "@/actions/actions";
import { IPost } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const PostPage = ({ slug }: { slug: string }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["post", slug],
    queryFn: async () => {
      const post = await getPostBySlug({ slug });
      if (post.error) throw new Error(post.error);
      if (post.success) return post.success as IPost;
    },
  });
  console.log(data);
  return (
    <div>
      <h1>{data?.title}</h1>
    </div>
  );
};

export default PostPage;
