// import { type Author } from './author';

export type Post = {
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  date: string;
  fileName: string;
  // author: Author;
  // ogImage: {
  //   url: string;
  // };
  content: string;
  preview?: boolean;
};
