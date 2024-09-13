"use client";

import { Categories } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface FilterProps {
  className?: string;
}

const Filters = ({ className }: FilterProps) => {
  const router = useRouter();
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
    <div>
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
