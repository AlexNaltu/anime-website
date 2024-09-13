"use client";

import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface Props {
  postId: string;
}

const AddComment = ({ postId }: Props) => {
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
      body: JSON.stringify({ name, email, comment, postId }),
    });
    if (!res.ok) {
      console.log("An error occurred while submitting the comment");
      return;
    }

    reset();
  };

  return (
    <div>
      <h1>Leave A comment</h1>
      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
        <label htmlFor="">Name</label>
        <Input {...register("name", { required: true })} />
        {errors.name && (
          <p className="text-red-600 text-xs">Name is required.</p>
        )}
        <label htmlFor="">Email | Your Email will not be published</label>
        <Input
          {...register("email", {
            required: true,
            pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
          })}
        />
        {errors.email && (
          <p className="text-red-600 text-xs">
            Please enter a valid email address.
          </p>
        )}
        <label htmlFor="">Comment</label>
        <Textarea {...register("comment", { required: true, minLength: 2 })} />
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
    </div>
  );
};

export default AddComment;
