import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RiInstagramFill } from "react-icons/ri";
import { SiTiktok } from "react-icons/si";
import { FaSquareFacebook } from "react-icons/fa6";

const Footer = () => {
  return (
    <>
      <div className="bg-black mt-6 lg:mt-20  border-y-8 border-red-950">
        <div className="px-2 sm:px-4 py-4 lg:py-14 max-w-[1300px] mx-auto w-full">
          <Image
            src="/icons/logo.svg"
            alt="logo"
            width={200}
            height={200}
            className="mx-auto sm:mx-0"
          />
          <div className="flex flex-col items-center my-3 sm:flex-row gap-3 lg:text-lg">
            <Link href="/about" className="footer_link">
              About Us
            </Link>
            <Link href="/contact" className="footer_link">
              Contact Us
            </Link>
            <Link href="" className="footer_link">
              Discord Server
            </Link>
          </div>
          <div className="flex flex-col items-center my-3 sm:flex-row gap-3">
            <h1 className="text-lg font-black mb-1 sm:text-xl">Follow Us</h1>
            <div className="flex gap-3">
              <Link href="" className="footer_link">
                <RiInstagramFill size={27} />
              </Link>
              <Link href="" className="footer_link">
                <SiTiktok size={27} />
              </Link>
              <Link href="" className="footer_link">
                <FaSquareFacebook size={27} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <h2 className="my-6 text-center">Copyright © 2024 MyAnimeNews</h2>
    </>
  );
};

export default Footer;
