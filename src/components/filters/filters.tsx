"use client";

import { Categories } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface FilterProps {
  className?: string;
}

const Filters = ({ className }: FilterProps) => {
  // useRouter hook to get the router object
  const router = useRouter();
  // Function to set the filter based on the category
  const setFilter = (category: string) => {
    if (category) {
      router.push("/posts/?category=" + category);
      console.log(category);
    }
    if (!category) {
      router.push("/");
    }
  };

  return (
    <div className="flex max-w-[750px] overflow-x-auto filter-scrollbar">
      {Categories.map((category, i) => (
        <Button
          key={i}
          onClick={() => setFilter(category.href)}
          className={cn(className, "bg-transparent text-white")}
        >
          {category.title}
        </Button>
      ))}
    </div>
  );
};

export default Filters;
