import { TypedObject } from "sanity";

export interface IPost {
  _id: string;
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
  category: ICategory[];
  mainImage: string;
  readingTime: number;
  body: TypedObject | TypedObject[];
}

export interface ICategory {
  title: string;
}
