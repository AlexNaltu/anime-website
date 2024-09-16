import { Comment } from "@/types/types";
import React from "react";
interface Props {
  slug: string;
  commentsOrder: string;
  comments: Comment[];
}

const AllComments = ({ slug, commentsOrder, comments }: Props) => {
  return <div>{comments.length === 0 && <p>No comments yet</p>}</div>;
};

export default AllComments;
