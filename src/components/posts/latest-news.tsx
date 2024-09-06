import { getLatestNews } from "@/actions/actions";
import { IPost } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const LatestNews = async () => {
  const latestNews = await getLatestNews();
  return (
    <div>
      {latestNews.map((post: IPost) => (
        <div key={post._id}>
          <h1>{post.title}</h1>
        </div>
      ))}
    </div>
  );
};

export default LatestNews;
