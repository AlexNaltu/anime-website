import { Comment } from "@/types/types";
import React from "react";
interface Props {
  slug: string;
  comments: Comment[];
}

const AllComments = ({ slug, comments }: Props) => {
  return <div>{comments.length === 0 && <p>No comments yet</p>}</div>;
};

export default AllComments;
