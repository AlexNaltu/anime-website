import { getLatestNews, getPosts } from "@/actions/actions";
import MenuNavbar from "@/components/navbar/menu-navbar";
import Searchbar from "@/components/navbar/searchbar";
import UserNavbar from "@/components/navbar/user-navbar";
import Newsletter from "@/components/newsletter/newsletter";
import LatestNews from "@/components/posts/latest-news";
import Posts from "@/components/posts/posts";
import { getQueryClient } from "@/lib/query";
import { IPost } from "@/types/types";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Image from "next/image";

export default async function Home() {
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
        <nav className="flex items-center justify-between max-w-[1300px] mx-auto px-2">
          <MenuNavbar />
          <Image src="/icons/logo.svg" alt="logo" width={170} height={100} />
          <Searchbar />
        </nav>
      </div>
      <div className="md:flex justify-between max-w-[1300px] mx-auto">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Posts />
        </HydrationBoundary>
        <div className="flex flex-col my-5 mx-2">
          <LatestNews />
          <Newsletter />
        </div>
      </div>
    </div>
  );
}
