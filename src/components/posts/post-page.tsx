"use client";

import { useQuery } from "@tanstack/react-query";
import { getPostBySlug } from "@/actions/actions";
import React from "react";
import { IPost } from "@/types/types";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import urlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import { formatDate } from "date-fns";

// Interface for the custom image component
interface ImageComponentProps {
  value: any;
  isInline: boolean;
}

interface PostProps {
  post: IPost;
}

const PostPage = ({ post }: PostProps) => {
  // Custom image component for rendering images in the PortableText
  const simpleImageComponent = ({ value, isInline }: ImageComponentProps) => {
    return (
      <div className="relative min-h-[300px]">
        <Image
          src={urlBuilder(client)
            .image(value)
            .width(isInline ? 100 : 800)
            .fit("max")
            .auto("format")
            .url()}
          alt="/"
          style={{
            display: isInline ? "inline-block" : "block",
          }}
          fill
          sizes="(max-width: 768px)"
          className="object-cover"
        />
      </div>
    );
  };

  // Components object for the PortableText, can be used to render custom components in the PortableText
  const components = {
    types: {
      image: simpleImageComponent,
    },
  };

  return (
    <div className="mt-5 flex flex-col gap-3 max-w-[750px] mx-auto lg:mx-0 px-2 sm:px-4 md:mt-10">
      <div>
        <h1 className="uppercase font-black text-xl sm:text-2xl lg:text-4xl">
          {post.title}
        </h1>
        <div className="flex gap-5">
          <p>{post.readingTime} min read</p>
          <p>Posted: {formatDate(new Date(post.publishedAt), "dd.MM.yyyy")}</p>
        </div>
      </div>
      <div className="relative min-h-[300px]">
        <Image
          src={post.mainImage!}
          alt="main"
          fill
          sizes="(max-width: 768px)"
          className="object-cover mb-5"
        />
      </div>
      <p>{post.description}</p>

      <PortableText value={post.body!} components={components} />
    </div>
  );
};

export default PostPage;
