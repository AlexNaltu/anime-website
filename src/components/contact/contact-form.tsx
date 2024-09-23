"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ReactNode, useRef } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import emailjs from "@emailjs/browser";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

// Define the schema for the form
const userSchema = z.object({
  user_name: z.string().min(2).max(255),
  user_email: z.string().email(),
  message: z.string().min(10).max(5000),
});

// Create the form component
const ContactForm = () => {
  const ref: any = useRef();
  const router = useRouter();
  // Initialize the react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(userSchema) });

  // Handle the form submission with emailjs
  const onSubmit = (data: any) => {
    emailjs
      .sendForm(
        "service_r740fpu",
        "adelin-contact",
        ref.current,
        "9kAgROYSfFf9EA5Ey"
      )
      .then((result) => console.log("success", result.text))
      .catch((error) => console.log("error", error.text));

    router.push("/contact/success");
  };
  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        ref={ref}
        className="flex flex-col gap-3"
      >
        <div>
          <label htmlFor="user_name">Name</label>
          <Input
            {...register("user_name")}
            className="rounded-none"
            placeholder="Your Name"
          />
          {errors.user_name && (
            <span>{errors.user_name.message as ReactNode}</span>
          )}
        </div>
        <div>
          <label htmlFor="user_name">Email</label>
          <Input
            {...register("user_email")}
            className="rounded-none"
            placeholder="Your Email"
            type="email"
          />
          {errors.user_email && (
            <span>{errors.user_email.message as ReactNode}</span>
          )}
        </div>
        <div>
          <label htmlFor="user_name">How can we help you?</label>
          <Textarea
            {...register("message")}
            rows={5}
            className="rounded-none"
            placeholder="Your Message"
          />
          {errors.message && <span>{errors.message.message as ReactNode}</span>}
        </div>
        <Button
          type="submit"
          className="w-full rounded-none bg-gradient-to-r from-black from-50% to-red-950 to-100% border-2 border-white hover:border-red-950 transition-all duration-150 ease-in"
        >
          Send Message
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
