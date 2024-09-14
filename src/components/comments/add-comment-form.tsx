"use client";
import { useUser } from "@clerk/nextjs";
import { useForm } from "react-hook-form";

interface Props {
  postId: string;
}

const AddComment = ({ postId }: Props) => {
  const { user, isSignedIn } = useUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data: any) => {
    const { name, email, comment } = data;

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
    <div className="mt-14">
      <p>
        Leave a comment <span role="img">💬</span>
      </p>
      {isSignedIn ? (
        <form
          className="flex flex-col border dark:border-purple-950 shadow-sm rounded px-8 pt-6 pb-6 mb-10"
          onSubmit={handleSubmit((data) => onSubmit(data))}
        >
          <label>Comment</label>
          <textarea
            {...register("comment", { required: true, minLength: 2 })}
            className="mb-4 py-1 bg-amber-100 dark:bg-slate-900"
          />
          {errors.comment && (
            <p className="text-red-600 text-xs">Minimum 2 characters.</p>
          )}
          <input
            className={`cursor-pointer bg-purple-500 text-white rounded py-2 hover:bg-purple-600 ${
              isSubmitting ? "opacity-50" : ""
            }`}
            disabled={isSubmitting}
            value={isSubmitting ? "Submitting..." : "Submit"}
            type="submit"
          />
        </form>
      ) : (
        <p>You must be logged in to comment</p>
      )}
    </div>
  );
};

export default AddComment;
