"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const requiredSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

type FormData = z.infer<typeof requiredSchema>;

const Newsletter = () => {
  const [status, setStatus] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(requiredSchema) });

  const onSubmit = async (data: FormData) => {
    setButtonDisabled(true);
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email }),
      });
      const responseData = await response.json();
      if (responseData.status >= 400) {
        setStatus(responseData.status);
        setMessage(
          "Error joining the newsletter. You can contact us at alxnbusiness1@gmail.com"
        );
        setTimeout(() => {
          setMessage("");
          setButtonDisabled(false);
        }, 2000);
        return;
      }

      setStatus(201);
      setMessage("You have successfully joined the newsletter");
      setTimeout(() => {
        setMessage("");
        setButtonDisabled(false);
      }, 4000);
    } catch (error) {
      setStatus(500);
      setMessage(
        "Error joining the newsletter. You can contact us at alxnbusiness1@gmail.com"
      );
      setTimeout(() => {
        setMessage("");
        setButtonDisabled(false);
      }, 2000);
    }
  };

  const submittingClick = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
    }, 2000);
  };

  return (
    <div className="m-2 max-w-[750px] mx-auto px-2 md:mx-0 bg-gradient-to-r from-black from-50% to-red-950 to-100% py-8 border-red-950 border-4">
      <h1 className="text-lg mb-2">
        Join the newsletter for the latest blog updates
      </h1>
      <form className="flex flex-col xs:flex-row">
        <Input
          {...register("email")}
          type="email"
          placeholder="Your Email"
          className="border-black bg-white rounded-none placeholder:text-black placeholder:font-black text-black"
        />
        <Button type="submit" className="px-6 bg-black rounded-none w-fit">
          {submitting ? "Submitting..." : "Subscribe"}
        </Button>
        {message && (
          <p
            className={`${status !== 201 ? "text-red-500" : "text-green-500"} font-black`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default Newsletter;
