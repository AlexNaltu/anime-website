"use client";
import { getPosts } from "@/actions/actions";
import { ICategory, IPost } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { formatDate } from "date-fns";
import { Button } from "../ui/button";
import { useSearchParams } from "next/navigation";

const Posts = () => {
  const params = useSearchParams();
  const category = params.get("category") as ICategory | null;
  const { data, error, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const posts = await getPosts();
      if (posts.error) throw new Error(posts.error);
      if (posts.success) return posts.success;
    },
  });

  const categoryFilterPosts = useMemo(() => {
    if (category && data) {
      return data.filter((post: IPost) =>
        // @ts-ignore
        post.category?.map((cat) => cat.title).includes(category)
      );
    }
    return data;
  }, [data, category]);

  return (
    <div>
      {categoryFilterPosts.map((post: IPost) => (
        <Link key={post._id} href={`/posts/${post.slug}`}>
          <Image
            src={post.mainImage}
            alt={post.title}
            width={300}
            height={200}
          />
          <h2>{post.title}</h2>
          <p>{post.description}</p>
          {post.category.map((cat: ICategory) => (
            <span key={cat.title} className="bg-red-950 text-white">
              {cat.title}
            </span>
          ))}
        </Link>
      ))}
    </div>
  );
};

export default Posts;
