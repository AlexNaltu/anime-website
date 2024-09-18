import { getFeaturedPlaylist, getPosts } from "@/actions/actions";
import Filters from "@/components/filters/filters";
import Newsletter from "@/components/newsletter/newsletter";
import LatestNews from "@/components/posts/latest-news";
import { IPlaylist, IPost } from "@/types/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { formatDate } from "date-fns";

export default async function Home() {
  const [posts, featuredPlaylist] = await Promise.all([
    getPosts(),
    getFeaturedPlaylist(),
  ]);

  return (
    <div className="max-w-[1300px] mx-auto px-2">
      <div>
        {featuredPlaylist.map((playlist: IPlaylist) => (
          <div key={playlist._id}>
            {playlist.posts.map((post: IPost) => (
              <div key={post._id}>
                <h1>{post.title}</h1>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="md:flex justify-between gap-2">
        <div className="flex flex-col gap-2 md:max-w-[750px]">
          <div className="md:max-w-[750px]">
            <h1 className="border-b-2 border-red-500">Latest</h1>
            <Filters className="p-0 mr-4" />
          </div>
          {posts.success.map((post: IPost) => (
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
                  className=""
                />
              </CardHeader>
              <CardContent className="p-2 flex flex-col self-end">
                <CardTitle>{post.title}</CardTitle>
                <div className="flex justify-between text-xs my-1">
                  <p>{post.readingTime} min read</p>
                  <p>{formatDate(new Date(post.publishedAt), "dd.MM.yyyy")}</p>
                </div>
                <CardDescription className="line-clamp-4 sm:line-clamp-3">
                  {post.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="">
          <div className="flex flex-col mx-2">
            <h1 className="font-black text-xl">Categories</h1>
            <Filters className="flex flex-col gap-2 px-0" />
            <LatestNews />
          </div>
        </div>
      </div>
    </div>
  );
}
