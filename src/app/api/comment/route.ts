import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  // get the data from the request
  const data = await req.json();
  // destructure the data
  const { name, email, comment, postId } = data;
  // check if all fields are filled
  if (!name || !email || !comment || !postId) {
    return NextResponse.json(
      {
        message: "Please fill in all fields",
      },
      {
        status: 400,
      }
    );
  }

  // create a new comment
  try {
    const newComment = await client.create({
      _type: "comment",
      name,
      email,
      comment,
      post: {
        _type: "reference",
        _ref: postId,
      },
    });

    return NextResponse.json({
      message: "Comment added successfully",
      comment: newComment,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create comment" },
      { status: 500 }
    );
  }
}
