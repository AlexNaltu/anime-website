import MenuNavbar from "@/app/components/navbar/menu-navbar";
import Searchbar from "@/app/components/navbar/searchbar";
import UserNavbar from "@/app/components/navbar/user-navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <UserNavbar />
      <div className="border-y-4 border-black">
        <nav className="flex items-center justify-between max-w-[1500px] mx-auto px-2">
          <MenuNavbar />
          <Image src="/icons/logo.svg" alt="logo" width={170} height={100} />
          <Searchbar />
        </nav>
      </div>
    </div>
  );
}
