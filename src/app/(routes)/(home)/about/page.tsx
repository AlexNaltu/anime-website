import Link from "next/link";
import React from "react";

const AboutPage = () => {
  return (
    <div className="max-w-[1300px] mx-auto px-2 sm:px-4 my-4">
      <h1 className="text-2xl my-3 font-black lg:text-4xl lg:my-5">
        Welcome to MyAnimeNews!
      </h1>
      <p className="sm:text-lg lg:text-xl">
        This site is created by a passionate anime fan, run entirely by me. My
        goal is to provide a space where fellow anime enthusiasts can explore
        and discuss all things anime. Whether you&apos;re into the latest
        series, classic favorites, or deep-dive discussions, you&apos;re in the
        right place!
        <br />
        <br />I manage everything here solo, from writing content to keeping the
        site updated with fresh recommendations and insights. If you&apos;re a
        fan of anime and want a cozy corner to indulge in anime talk,
        you&apos;ve found your spot. Thanks for visiting, and I hope you enjoy
        the content as much as I enjoy creating it!
      </p>
      <h2 className="text-xl font-black my-4">You can support me here:</h2>
      <div className="flex flex-col gap-2">
        <Link href="/donate" className="underline hover:decoration-orange-950">
          Buy Me a Coffee!
        </Link>
        <Link href="/donate" className="underline hover:decoration-red-700">
          Typestream
        </Link>
      </div>
      <p className="my-4">Thanks!!</p>
    </div>
  );
};

export default AboutPage;
