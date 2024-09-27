import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';
import { Post } from '@/interfaces/post';

const POSTS_DIR = join(process.cwd(), '_posts');

export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(POSTS_DIR);

  const posts: Post[] = fileNames
    .map((slug) => getPostByFileName(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  return posts;
}

export function getPostByYearAndSlug(year: string, slug: string) {
  const fileNames = fs.readdirSync(POSTS_DIR).map((file) => file.replace(/\.md$/, ''));

  const matchingFile = fileNames.find((file) => file.endsWith(slug) && file.startsWith(year));
  if (!matchingFile) {
    throw new Error(`Cannot find blog matching year: ${year} & slug: ${slug}`);
  }

  return getPostByFileName(matchingFile);
}

export function getPostByFileName(filename: string) {
  const postFileName = filename.replace(/\.md$/, '');

  const fullPath = join(POSTS_DIR, `${postFileName}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return { ...data, fileName: postFileName, content } as Post;
}
