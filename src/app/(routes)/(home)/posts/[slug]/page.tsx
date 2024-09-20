import { getPostBySlug, getRelatedPosts } from "@/actions/actions";
import AddComment from "@/components/comments/add-comment-form";
import AllComments from "@/components/comments/all-comments";
import PostPage from "@/components/posts/post-page";
import { ICategory, IPost, ITag } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "date-fns";
import Filters from "@/components/filters/filters";

const PostSlugPage = async ({ params }: { params: { slug: string } }) => {
  const post = await getPostBySlug({ slug: params.slug });

  //map categories to get related posts
  const categoryTitles = post!.category.map((cat: ICategory) => cat.title);
  const postTags = post!.tags.map((tag: ITag) => tag.tag);
  const relatedPosts = await getRelatedPosts({
    category: categoryTitles[0],
    tags: postTags,
  });

  return (
    <div className="max-w-[1300px] mx-auto lg:flex justify-between">
      <div>
        <PostPage post={post} />
        <AddComment postId={post?._id!} />
        <AllComments comments={post?.comments || []} slug={params.slug} />
      </div>
      <div>
        <h1 className="px-2 sm:px-4 text-xl font-black mt-4 mb-2">Read More</h1>
        <div className="max-w-[700px] lg:w-[400px] flex flex-col gap-2 px-2 sm:px-4">
          {relatedPosts.map((post: IPost) => (
            <Link key={post._id} href={`/posts/${post.slug}`}>
              <Card className="rounded-none sm:flex justify-between lg:flex-col">
                <CardHeader className="p-2 relative w-full sm:min-w-[40%] min-[900px]:w-[400px] lg:w-[358px] h-[200px]">
                  <Image
                    src={post.mainImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) (height: 200px)"
                    style={{ objectFit: "cover" }}
                  />
                </CardHeader>
                <CardContent className="p-2 flex flex-col self-end">
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
        </div>
        <div className="px-2 sm:px-4 mt-4">
          <h2 className="text-lg font-black">Categories</h2>
          <Filters className="flex flex-col text-start" />
        </div>
      </div>
    </div>
  );
};

export default PostSlugPage;
