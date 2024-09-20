"use client";
import Image from "next/image";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/actions/actions";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { IPost } from "@/types/types";
import Fuse from "fuse.js";
import { Input } from "../ui/input";
import SearchResults from "./search-results";
import { useForm } from "react-hook-form";
import { debounce } from "lodash";
import { AiOutlineClose } from "react-icons/ai";

const Searchbar = () => {
  // fetching the posts
  const { data, error, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const products = await getPosts();
      if (products.error) throw new Error(products.error);
      if (products.success) return products.success;
    },
  });

  // getting the query text
  const [queryText, setQueryText] = useState("");
  // store the search results in a state
  const [searchResults, setSearchResults] = useState<IPost[] | undefined>(data);
  // initialize the react-hook-form
  const { register } = useForm();

  // debounce the search
  const handleSearch = useCallback(
    debounce((searchTerm) => {
      setQueryText(searchTerm);
    }, 600),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    handleSearch(searchTerm);
  };

  // initialize the fuse search with useMemo
  const fuse = useMemo(() => {
    if (data) {
      return new Fuse(data || [], {
        keys: ["title", "description"],
        includeScore: true,
      });
    }
    return null;
  }, [data]);

  useEffect(() => {
    // if there is no query text, set the search results to an empty array
    if (!queryText || !fuse) {
      setSearchResults([]);
      return;
    }

    // search the posts based on the query text
    const result = fuse.search(queryText);

    // transform the results
    const transformedResults = result.map((res) => res.item as IPost);
    setSearchResults(transformedResults);
  }, [queryText, data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts</div>;

  return (
    <div>
      <Drawer direction="left">
        <DrawerTrigger>
          <Image
            src="/icons/searchbar-icon.svg"
            alt="logo"
            width={35}
            height={35}
          />
        </DrawerTrigger>
        <DrawerContent className="px-3 font-sans font-medium text-base bg-black text-white max-w-[400px]">
          <DrawerHeader className="flex justify-between items-center mb-2">
            <DrawerTitle>Search Blog</DrawerTitle>
            <DrawerClose children={<AiOutlineClose size={30} />} />
          </DrawerHeader>
          <DrawerDescription>
            <form>
              <Input
                type="text"
                placeholder="Search..."
                {...register("search", {
                  onChange: (e) => handleChange(e),
                })}
              />
            </form>
            {queryText && queryText.length > 2 && (
              <div>
                {searchResults && searchResults.length > 0 ? (
                  searchResults.map((result) => (
                    <SearchResults key={result._id} result={result} />
                  ))
                ) : (
                  <p>No Results Found</p>
                )}
              </div>
            )}
          </DrawerDescription>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Searchbar;
