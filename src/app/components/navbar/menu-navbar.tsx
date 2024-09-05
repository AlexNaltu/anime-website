import Image from "next/image";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const MenuNavbar = () => {
  return (
    <div>
      <Image src="/icons/menu-icon.svg" alt="logo" width={35} height={35} />
    </div>
  );
};

export default MenuNavbar;
