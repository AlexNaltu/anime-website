import { TypedObject } from "sanity";

export interface IPost {
  _id: string;
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
  category: ICategory[];
  tags: ITag[];
  mainImage: string;
  readingTime: number;
  body: TypedObject | TypedObject[];
  comments: Comment[];
}

export interface ICategory {
  title: string;
}

export interface ITag {
  tag: string;
}

export interface Comment {
  name: string;
  comment: string;
  _createdAt: string;
  _id: string;
}
