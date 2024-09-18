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

// Interface for the custom image component
interface ImageComponentProps {
  value: any;
  isInline: boolean;
}

interface PostProps {
  slug: string;
  post: IPost;
}

const PostPage = ({ slug, post }: PostProps) => {
  // Custom image component for rendering images in the PortableText
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

  // Components object for the PortableText, can be used to render custom components in the PortableText
  const components = {
    types: {
      image: simpleImageComponent,
    },
  };

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.description}</p>
      <Image src={post.mainImage!} alt="main" width={300} height={300} />
      <PortableText value={post.body!} components={components} />
    </div>
  );
};

export default PostPage;
