import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://alxnstore.shop"),
  keywords: ["E-commerce", "Clothing", "Fashion", "Store"],
  title: {
    default: "Sign In",
    template: "%s | Alxn Store",
  },
  openGraph: {
    description: "Alxn Store is a clothing store",
    images: [],
  },
};

const SignInPage = () => {
  return (
    <div className="flex justify-center my-10">
      <SignIn forceRedirectUrl={"/cart"} />
    </div>
  );
};

export default SignInPage;
