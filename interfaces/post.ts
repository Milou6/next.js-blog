export type Post = {
  title: string;
  slug: string;
  excerpt: string;
  tags: string[];
  coverImage: string;
  imageCaption: string;
  imageAlt: string;
  date: string;
  fileName: string;
  content: string;
};

export function getPostUrl(post: Post) {
  const postYear = post.date.slice(0, 4);
  return `/posts/${postYear}/${post.slug}#article`;
}
