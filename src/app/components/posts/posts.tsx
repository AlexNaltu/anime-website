"use client";
import { getPosts } from "@/actions/actions";
import { IPost } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

const Posts = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const posts = await getPosts();
      if (posts.error) throw new Error(posts.error);
      if (posts.success) return posts.success;
    },
  });

  return (
    <div className="flex flex-col gap-2">
      {data.map((post: IPost) => (
        <div key={post.id}>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
          <Image src={post.mainImage} alt="logo" width={170} height={100} />
        </div>
      ))}
    </div>
  );
};

export default Posts;
