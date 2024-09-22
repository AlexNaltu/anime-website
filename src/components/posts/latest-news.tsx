import { getLatestNews } from "@/actions/actions";
import { IPost } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

const LatestNews = async () => {
  const latestNews = await getLatestNews();
  return (
    <div className="mt-3">
      <h1 className="font-black text-xl mb-2">Latest News</h1>
      <div className="flex flex-col gap-3">
        {latestNews.map((post: IPost) => (
          <Link href={`/posts/${post.slug}`} key={post._id}>
            <h1 className="bg-transparent p-0  hover:bg-transparent hover:text-slate-300 w-fit">
              {post.title}
            </h1>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LatestNews;
