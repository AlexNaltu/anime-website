import ContactForm from "@/components/contact/contact-form";
import React from "react";

const ContactPage = () => {
  return (
    <div className="max-w-[1300px] mx-auto px-2 sm:px-4 md:flex gap-4 mb-10 sm:my-5 md:my-10">
      <h1 className="font-black text-lg my-2 sm:text-xl md:text-2xl md:max-w-[40%]">
        You can contact me here, on discord or the other social media below
      </h1>
      <ContactForm />
    </div>
  );
};

export default ContactPage;
