import { getLatestNews } from "@/actions/actions";
import { IPost } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const LatestNews = async () => {
  const latestNews = await getLatestNews();
  return (
    <div>
      <h1 className="font-black text-xl mb-2">Latest News</h1>
      <div>
        {latestNews.map((post: IPost) => (
          <div key={post._id}>
            <h1>-{post.title}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestNews;
