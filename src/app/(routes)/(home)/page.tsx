import {
  getFeaturedPlaylist,
  getLatestPosts,
  getPosts,
} from "@/actions/actions";
import Filters from "@/components/filters/filters";
import LatestNews from "@/components/posts/latest-news";
import { IPlaylist, IPost } from "@/types/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { formatDate } from "date-fns";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const [posts, featuredPlaylist] = await Promise.all([
    getLatestPosts(),
    getFeaturedPlaylist(),
  ]);

  return (
    <div className="max-w-[1300px] mx-auto px-2 sm:px-4">
      <div className="mt-3 lg:mt-4">
        {featuredPlaylist.map((playlist: IPlaylist) => {
          const posts = playlist.posts;
          const firstPost = posts[0];
          const lastThreePosts = posts.slice(-3);

          return (
            <div key={playlist._id}>
              {/* First Image as a Large One */}
              <div className="mb-4 relative min-h-[300px] max-h-[400px]">
                <Link href={`/posts/${firstPost.slug}`}>
                  <Image
                    src={firstPost.mainImage}
                    alt={firstPost.title}
                    fill
                    sizes="(max-width: 768px)"
                    className="object-cover"
                  />
                  <h1 className="text-lg font-bold absolute bottom-[0px] bg-black bg-opacity-50 text-white p-1 line-clamp-1 w-full">
                    {firstPost.title}
                  </h1>
                </Link>
              </div>

              {/* Last Three Images as Smaller Ones */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {lastThreePosts.map((post: IPost) => (
                  <div key={post._id} className="relative">
                    <Link href={`/posts/${post.slug}`}>
                      <Image
                        src={post.mainImage}
                        alt={post.title}
                        width={300}
                        height={200}
                        className="w-full h-auto object-cover"
                      />
                      <h1 className="text-lg font-bold absolute bottom-[0px] bg-black bg-opacity-50 text-white p-1 line-clamp-1 w-full">
                        {post.title}
                      </h1>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="lg:flex justify-between gap-2 my-4 sm:my-10">
        <div className="flex flex-col gap-2 md:max-w-[750px]">
          <div className="md:max-w-[700px]">
            <h1>Latest</h1>
            <div className="w-full h-1 bg-gradient-to-l from-black from-50% to-red-950 to-100%" />
            <Filters className="flex max-w-[750px] overflow-x-auto filter-scrollbar gap-4" />
          </div>
          {posts.success.map((post: IPost) => (
            <Link key={post._id} href={`/posts/${post.slug}`}>
              <Card className="rounded-none sm:flex justify-between">
                <CardHeader className="p-2 relative w-full sm:min-w-[40%] min-[900px]:w-[400px] h-[200px]">
                  <Image
                    src={post.mainImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) (height: 200px)"
                    style={{ objectFit: "cover" }}
                  />
                </CardHeader>
                <CardContent className="p-2 flex flex-col self-end hover:bg-slate-100 transition-all duration-150 ease-in">
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
            </Link>
          ))}
          <Link href="/posts">
            <Button className="bg-black  hover:bg-white hover:text-black hover:border-red-950 transition-all duration-150 ease-in my-2 w-full rounded-none">
              Read More
            </Button>
          </Link>
        </div>

        <div className="">
          <div>
            <h1 className="font-black text-xl">Categories</h1>
            <Filters className="flex flex-col text-start" />
            <LatestNews />
          </div>
        </div>
      </div>
    </div>
  );
}
