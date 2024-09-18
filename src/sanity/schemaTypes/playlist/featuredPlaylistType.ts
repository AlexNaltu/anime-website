import { defineField, defineType } from "sanity";

export default defineType({
  name: "featuredPlaylist",
  title: "Featured Playlist",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "posts",
      title: "Featured Posts",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "post" }],
        },
      ],
    }),
  ],
});
