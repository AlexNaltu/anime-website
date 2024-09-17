import { Comment } from "@/types/types";
import React from "react";
interface Props {
  slug: string;
  comments: Comment[];
}

const AllComments = ({ slug, comments }: Props) => {
  return (
    <div>
      <h1>All Comments</h1>
      {comments.length === 0 && <p>No comments yet</p>}
      {comments?.map((comment) => (
        <div key={comment?._id} className="border-b border-gray-200/50 py-2">
          <p>
            <strong>{comment?.name}</strong>{" "}
            <span className="text-gray-500 text-sm">
              {new Date(comment?._createdAt).toLocaleString()}
            </span>
          </p>
          <p>{comment?.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default AllComments;
