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
    <div className={cn(className)}>
      {Categories.map((category, i) => (
        <Button
          key={i}
          onClick={() => setFilter(category.href)}
          className="bg-transparent p-0  hover:bg-transparent hover:text-red-950 w-fit"
        >
          {category.title}
        </Button>
      ))}
    </div>
  );
};

export default Filters;
