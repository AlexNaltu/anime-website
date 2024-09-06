import Image from "next/image";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { TbArrowBigRightFilled } from "react-icons/tb";

const Newsletter = () => {
  return (
    <div className="m-2 max-w-[600px] mx-auto md:px-2 md:mx-0">
      <Image
        src={"/newsletter_images/newsletter-girl.png"}
        alt="/"
        width={500}
        height={500}
      />
      <form className="flex flex-col gap-2 xs:flex-row">
        <Input
          placeholder="Your Email"
          className="border-black border-2 bg-[#e94d2c] placeholder:text-white placeholder:font-black text-white"
        />
        <Button type="submit" className="px-8 bg-black rounded-lg w-fit">
          <TbArrowBigRightFilled size={25} />
        </Button>
      </form>
    </div>
  );
};

export default Newsletter;
