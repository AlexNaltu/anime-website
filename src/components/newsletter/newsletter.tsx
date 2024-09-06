import Image from "next/image";
import React from "react";

const Newsletter = () => {
  return (
    <div>
      <Image
        src={"/newsletter_images/newsletter-girl.png"}
        alt="/"
        width={300}
        height={300}
      />
    </div>
  );
};

export default Newsletter;
