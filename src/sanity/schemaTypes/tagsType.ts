import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const tagsType = defineType({
  name: "tags",
  title: "Tags",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "tag",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "tag",
      },
    }),
  ],
});
