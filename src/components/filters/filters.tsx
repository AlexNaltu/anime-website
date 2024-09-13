"use client";

import { Categories } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const Filters = () => {
  const router = useRouter();
  const setFilter = (category: string) => {
    if (category) {
      router.push("/posts/?category=" + category);
    }
    if (!category) {
      router.push("/");
    }
  };

  return (
    <div>
      {Categories.map((category, i) => (
        <Button key={i} onClick={() => setFilter(category.href)}>
          {category.title}
        </Button>
      ))}
    </div>
  );
};

export default Filters;
