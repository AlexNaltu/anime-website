import Link from "next/link";
import React from "react";
import Searchbar from "../searchbar/searchbar";
import UserNavbar from "./user-navbar";
import Image from "next/image";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { getQueryClient } from "@/lib/query";
import { getPosts } from "@/actions/actions";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Filters from "../filters/filters";
import { links } from "@/lib/constants";

export default async function Navbar() {
  // Prefetch the posts data for the search bar
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["searchbarPosts"],
    queryFn: async () => {
      const posts = await getPosts();
      if (posts.error) throw new Error(posts.error);
      return posts.success;
    },
  });
  return (
    <div>
      <UserNavbar />
      <div className="border-y-4 border-black">
        <nav className="flex items-center justify-between max-w-[1300px] mx-auto px-2 sm:px-4">
          <Drawer direction="left">
            <DrawerTrigger>
              <Image
                src="/icons/menu-icon.svg"
                alt="logo"
                width={35}
                height={35}
              />
            </DrawerTrigger>
            <DrawerContent className="px-3 font-sans font-medium text-base  bg-gradient-to-t from-black from-50% to-red-950 to-100% border-r-2 border-x-red-950 text-white max-w-[400px]">
              <DrawerHeader>
                <DrawerTitle className="text-xl">
                  <h1> Categories</h1>
                  <div className="w-full h-1 bg-gradient-to-r from-black from-50% to-red-950 to-100%" />
                </DrawerTitle>
                <DrawerClose />
              </DrawerHeader>
              <DrawerDescription>
                <Filters className="flex flex-col" />
                <h1 className="text-xl text-white mt-4">More</h1>
                <div className="w-full h-1 bg-gradient-to-l from-black from-50% to-red-950 to-100%" />
                <div className="flex flex-col my-4 gap-4">
                  {links.map((link) => (
                    <Link
                      key={link.title}
                      href={link.href}
                      className="text-white hover:text-slate-300"
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              </DrawerDescription>
            </DrawerContent>
          </Drawer>
          <Link href={"/"}>
            <Image src="/icons/logo.svg" alt="logo" width={170} height={100} />
          </Link>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <Searchbar />
          </HydrationBoundary>
        </nav>
      </div>
    </div>
  );
}
