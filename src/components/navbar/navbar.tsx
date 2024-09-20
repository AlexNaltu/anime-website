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

export default async function Navbar() {
  // Prefetch the posts data for the search bar
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["posts"],
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
            <DrawerContent className="px-3 font-sans font-medium text-base bg-primary text-white max-w-[400px]">
              <DrawerHeader>
                <DrawerTitle>Search</DrawerTitle>
                <DrawerClose />
              </DrawerHeader>
              <DrawerDescription></DrawerDescription>
              <DrawerFooter>
                <button>Search</button>
              </DrawerFooter>
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
