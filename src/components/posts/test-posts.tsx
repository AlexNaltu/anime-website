"use client";
import { getPosts } from "@/actions/actions";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";

const TestPosts = () => {
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: async ({
      pageParam,
    }): Promise<{
      data: Array<{ name: string; id: number }>;
      previousId: number;
      nextId: number;
    }> => {
      const response = await getPosts(pageParam);
      return response;
    },
    initialPageParam: 0,
    getPreviousPageParam: (firstPage) => firstPage.previousId,
    getNextPageParam: (lastPage) => lastPage.nextId,
  });
  return <div>TestPosts</div>;
};

export default TestPosts;
