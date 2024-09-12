import { IPost } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ISearchResultsProps {
  result: IPost;
}

const SearchResults = ({ result }: ISearchResultsProps) => {
  return (
    <div>
      <Link href={`/posts/${result.slug}`}>
        <Image src={result.mainImage} alt="logo" width={100} height={100} />
        <h1>{result.title}</h1>
      </Link>
    </div>
  );
};

export default SearchResults;
