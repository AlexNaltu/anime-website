import Image from "next/image";
import { FaSearch } from "react-icons/fa";

const Searchbar = () => {
  return (
    <div>
      <Image src="/icons/search-icon.svg" alt="logo" width={35} height={35} />
    </div>
  );
};

export default Searchbar;
