import { getPosts } from "@/actions/actions";
import MenuNavbar from "@/app/components/navbar/menu-navbar";
import Searchbar from "@/app/components/navbar/searchbar";
import UserNavbar from "@/app/components/navbar/user-navbar";
import Newsletter from "@/app/components/newsletter/newsletter";
import Posts from "@/app/components/posts/posts";
import { getQueryClient } from "@/lib/query";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Image from "next/image";

export default async function Home() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const posts = await getPosts();
      if (posts.error) throw new Error(posts.error);
      if (posts.success) return posts.success;
    },
  });

  return (
    <div>
      <UserNavbar />
      <div className="border-y-4 border-black">
        <nav className="flex items-center justify-between max-w-[1500px] mx-auto px-2">
          <MenuNavbar />
          <Image src="/icons/logo.svg" alt="logo" width={170} height={100} />
          <Searchbar />
        </nav>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Posts />
      </HydrationBoundary>
      <Newsletter />
    </div>
  );
}
