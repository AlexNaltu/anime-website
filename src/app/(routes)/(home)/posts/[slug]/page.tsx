import { getPostBySlug, getRelatedPosts } from "@/actions/actions";
import AddComment from "@/components/comments/add-comment-form";
import AllComments from "@/components/comments/all-comments";
import PostPage from "@/components/posts/post-page";
import { getQueryClient } from "@/lib/query";
import { ICategory, IPost, ITag } from "@/types/types";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

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
    <div>
      <PostPage slug={params.slug} post={post} />
      <AddComment postId={post?._id!} />
      <AllComments comments={post?.comments || []} slug={params.slug} />
      <div className="flex gap-5">
        {relatedPosts.map((post: IPost) => (
          <div key={post._id} className="">
            <h1 className="bg-red-500">{post.title}</h1>
            <Image
              src={post.mainImage}
              alt="logo"
              width={100}
              height={1000}
              className="rounded-md"
            />
            <div>
              {post.tags.map((tag: ITag) => (
                <p key={tag.tag}>{tag.tag}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostSlugPage;
