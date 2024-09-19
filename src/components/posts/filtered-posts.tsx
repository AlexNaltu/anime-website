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
  const itemsPerPage = 2;
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

  const paginatedPosts = categoryFilterPosts
    ? categoryFilterPosts.slice(offset, offset + itemsPerPage)
    : data?.slice(offset, offset + itemsPerPage);

  if (error) return <div>{error.message}</div>;
  if (categoryFilterPosts && data)
    return (
      <div>
        <div>
          {paginatedPosts.map((post: IPost) => (
            <div key={post._id}>
              <h1>{post.title}</h1>
            </div>
          ))}
        </div>
        <ReactPaginate
          pageCount={Math.ceil(paginatedPosts.length / itemsPerPage)}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
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
