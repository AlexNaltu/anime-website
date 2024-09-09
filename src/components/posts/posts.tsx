"use client";
import { getPosts } from "@/actions/actions";
import { IPost } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { formatDate } from "date-fns";
import { Button } from "../ui/button";

const initialPostList = 1;
const incrementInitialPostList = 1;

const Posts = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const posts = await getPosts();
      if (posts.error) throw new Error(posts.error);
      if (posts.success) return posts.success;
    },
  });

  const [displayPost, setDisplayPost] = useState(initialPostList);
  const [articles, setArticles] = useState(data);

  const loadMore = () => {
    setDisplayPost(displayPost + incrementInitialPostList);
  };

  return (
    <div>
      {articles.slice(0, displayPost).map((article: IPost) => (
        <div key={article._id}>
          <h1>{article.title}</h1>
        </div>
      ))}
      {displayPost < articles.length ? (
        <Button onClick={loadMore}>Load More</Button>
      ) : null}
    </div>
  );
};

export default Posts;
