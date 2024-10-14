// import { type Author } from './author';

export type Post = {
  title: string;
  slug: string;
  excerpt: string;
  tags: string[];
  coverImage: string;
  imageCaption: string;
  date: string;
  fileName: string;
  // author: Author;
  // ogImage: {
  //   url: string;
  // };
  content: string;
  preview?: boolean;
};

export function getPostUrl(post: Post) {
  const postYear = post.date.slice(0, 4);
  return `/posts/${postYear}/${post.slug}#article`;
}
