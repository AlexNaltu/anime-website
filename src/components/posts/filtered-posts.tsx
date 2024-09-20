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
import ReactPaginate from "react-paginate";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PageClickData {
  selectedPage: number;
  selected: number;
}

const FilteredPosts = () => {
  const [currentPage, setCurrentPage] = useState(0);
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

  const handlePageClick = (selectedPage: PageClickData) => {
    setCurrentPage(selectedPage.selected);
  };
  const itemsPerPage = 1;
  const offset = currentPage * itemsPerPage;

  const categoryFilterPosts = useMemo(() => {
    if (category && data) {
      return data.filter((post: IPost) =>
        // @ts-ignore
        post.category?.map((cat) => cat.title).includes(category)
      );
    }
    return data;
  }, [data, category]);

  if (error) return <div>{error.message}</div>;
  if (categoryFilterPosts && data)
    return (
      <div className="px-2 sm:px-4 max-w-[1300px] mx-auto">
        <div>
          {categoryFilterPosts
            .slice(offset, offset + itemsPerPage)
            .map((post: IPost) => (
              <Card
                className="rounded-none sm:flex justify-between"
                key={post._id}
              >
                <CardHeader className="p-2 relative w-full sm:min-w-[40%] min-[900px]:w-[400px] h-[200px]">
                  <Image
                    src={post.mainImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) (height: 200px)"
                    style={{ objectFit: "cover" }}
                  />
                </CardHeader>
                <CardContent className="p-2 flex flex-col self-end">
                  <CardTitle>{post.title}</CardTitle>
                  <div className="flex justify-between text-xs my-1">
                    <p>{post.readingTime} min read</p>
                    <p>
                      {formatDate(new Date(post.publishedAt), "dd.MM.yyyy")}
                    </p>
                  </div>
                  <CardDescription className="line-clamp-4 sm:line-clamp-3">
                    {post.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
        </div>
        <ReactPaginate
          pageCount={Math.ceil(
            (categoryFilterPosts?.length || data?.length || 0) / itemsPerPage
          )}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
          nextLabel={<MdKeyboardArrowRight size={25} />}
          previousLabel={<MdKeyboardArrowLeft size={25} />}
          breakLabel={"..."}
        />
      </div>
    );
};

export default FilteredPosts;
