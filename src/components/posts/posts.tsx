"use client";
import { getPosts } from "@/actions/actions";
import { IPost } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { formatDate } from "date-fns";

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
    <div className="flex flex-col gap-3 relative my-5 min-[600px]:mx-5 md:mx-2">
      {data.map((post: IPost) => (
        <Link
          href={`/posts/${post.slug}`}
          key={post._id}
          className=" rounded-md text-center custom-shadow mx-2 p-2 xs:p-3 xs:mx-5 max-w-[600px] lg:max-w-[800px] min-[600px]:mx-auto hover:bg-slate-100/50 transition-all duration-200 ease-linear"
        >
          <Image
            src={post.mainImage}
            alt="logo"
            width={1000}
            height={1000}
            className="rounded-md"
          />
          <h1 className="font-black ">{post.title}</h1>
          <div className="flex justify-between text-xs">
            <p>{post.readingTime} min read</p>
            <p>{formatDate(new Date(post.publishedAt), "dd.MM.yyyy")}</p>
          </div>
          <p className="line-clamp-4 font-semibold">{post.description}</p>
        </Link>
      ))}
    </div>
  );
};

export default Posts;
