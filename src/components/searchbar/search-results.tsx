import { IPost } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ISearchResultsProps {
  result: IPost;
}

const SearchResults = ({ result }: ISearchResultsProps) => {
  return (
    <div className="bg-white mt-3 border-4 border-black hover:bg-slate-100 transition-all duration-150 ease-in">
      <Link href={`/posts/${result.slug}`}>
        <div className="relative w-full h-[150px]">
          <Image
            src={result.mainImage}
            alt="logo"
            fill
            sizes="(max-width: 768px)"
            className="object-cover"
          />
        </div>
        <h1 className="px-1 text-black sm:text-lg line-clamp-3">
          {result.title}
        </h1>
      </Link>
    </div>
  );
};

export default SearchResults;
