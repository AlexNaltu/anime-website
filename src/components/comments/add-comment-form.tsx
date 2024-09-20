"use client";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useForm } from "react-hook-form";

interface Props {
  postId: string;
}

const AddComment = ({ postId }: Props) => {
  // Get the user and sign in status
  const { user, isSignedIn } = useUser();
  // Form handling
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data: any) => {
    const { name, email, comment } = data;

    // fetch request to add comment
    const res = await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({
        name: user?.username,
        email: user?.emailAddresses[0].emailAddress,
        comment,
        postId,
      }),
    });
    if (!res.ok) {
      console.log("Failed to add comment");
      return;
    }

    reset();
  };

  return (
    <div className="mt-14 max-w-[1300px] mx-auto px-2 sm:px-4">
      <p className="uppercase font-black text-lg">Leave a comment</p>
      {isSignedIn ? (
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit((data) => onSubmit(data))}
        >
          <textarea
            {...register("comment", { required: true, minLength: 2 })}
            rows={5}
            className="bg-transparent border-2 border-white p-2 rounded mt-3"
          />
          {errors.comment && (
            <p className="text-red-600 text-xs">Minimum 2 characters.</p>
          )}
          <input
            className={`cursor-pointer bg-black text-white rounded py-2 hover:bg-white hover:text-black transition-all duration-200 ease-linear ${
              isSubmitting ? "opacity-50" : ""
            }`}
            disabled={isSubmitting}
            value={isSubmitting ? "Submitting..." : "Submit"}
            type="submit"
          />
        </form>
      ) : (
        <div className="flex gap-1 mt-2 mb-3">
          <p>
            You must be logged in to comment -{" "}
            <span className="underline hover:decoration-red-600 transition-all duration-150 ease-linear">
              <Link href="/sign-in" className="">
                Sign In
              </Link>
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default AddComment;
