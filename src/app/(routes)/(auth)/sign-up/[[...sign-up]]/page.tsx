import { SignUp } from "@clerk/nextjs";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://alxnstore.shop"),
  keywords: ["E-commerce", "Clothing", "Fashion", "Store"],
  title: {
    default: "Sign Up",
    template: "%s | Alxn Store",
  },
  openGraph: {
    description: "Alxn Store is a clothing store",
    images: [],
  },
};

const SignUpPage = () => {
  return (
    <div className="flex justify-center my-10 ">
      <SignUp />
    </div>
  );
};

export default SignUpPage;
