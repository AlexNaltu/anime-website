"use client";

import { useQuery } from "@tanstack/react-query";
import { getPostBySlug } from "@/actions/actions";
import React from "react";
import { IPost } from "@/types/types";
import Image from "next/image";

const PostPage = ({ slug }: { slug: string }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["post", slug],
    queryFn: async () => {
      const post = await getPostBySlug({ slug });

      if (!post) throw new Error("Post not found");

      return post as IPost; // Return the full post object
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>{data?.title}</h1>
      <p>{data?.description}</p>
      <Image src={data?.mainImage!} alt="main" width={300} height={300} />
    </div>
  );
};

export default PostPage;
