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

interface ImageComponentProps {
  value: any;
  isInline: boolean;
}

const PostPage = ({ slug }: { slug: string }) => {
  // Fetch the post data
  const { data, error, isLoading } = useQuery({
    queryKey: ["post", slug],
    queryFn: async () => {
      const post = await getPostBySlug({ slug });

      if (!post) throw new Error("Post not found");

      return post as IPost;
    },
  });
  // loading state for the post
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const simpleImageComponent = ({ value, isInline }: ImageComponentProps) => {
    return (
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
        width={500}
        height={500}
      />
    );
  };

  const compoentns = {
    types: {
      image: simpleImageComponent,
    },
  };

  return (
    <div>
      <h1>{data?.title}</h1>
      <p>{data?.description}</p>
      <Image src={data?.mainImage!} alt="main" width={300} height={300} />
      <PortableText value={data?.body!} components={compoentns} />
    </div>
  );
};

export default PostPage;
