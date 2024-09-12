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

/**
 * 
 *  <button onClick={() => setFilter("News")}>News</button>
    <button onClick={() => setFilter("Reviews")}>Reviews</button>
    <button onClick={() => setFilter("Recommendations")}>Recommendations</button>
    <button onClick={() => setFilter("Manga")}>Manga</button>
    <button onClick={() => setFilter("Characters")}>Characters</button>
    <button onClick={() => setFilter("Fandom")}>Fandom</button>
    <button onClick={() => setFilter("Merchandise")}>Merchandise</button>
    <button onClick={() => setFilter("Top")}>Top</button>
    <button onClick={() => setFilter("Theories")}>Theories</button>
 */
