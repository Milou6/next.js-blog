import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';
import { Post } from '@/interfaces/post';
import { getSearchParamAsInt } from './utils';

const POSTS_DIR = join(process.cwd(), '_posts');
const POSTS_PER_PAGE = 4;
const POSTS_FIRST_PAGE = POSTS_PER_PAGE + 1; // show extra PostHero on home page

export function getLatestPosts({ page = undefined }: { page: string | undefined }): Post[] {
  let postsToFetch: string[] = [];
  const pageNumber = getSearchParamAsInt(page);

  const fileNames = fs.readdirSync(POSTS_DIR);
  fileNames.reverse();

  if (pageNumber && pageNumber > 1) {
    const startAtIndex = POSTS_FIRST_PAGE + (pageNumber - 2) * POSTS_PER_PAGE;
    postsToFetch = fileNames.slice(startAtIndex, startAtIndex + POSTS_PER_PAGE);
  } else {
    postsToFetch = fileNames.slice(0, POSTS_FIRST_PAGE);
  }

  const posts: Post[] = postsToFetch.map((filename) => getPostByFileName(filename));
  return posts;
}

// export function getAllPosts(): Post[] {
//   const fileNames = fs.readdirSync(POSTS_DIR);
//   fileNames.reverse();

//   const posts: Post[] = fileNames.map((slug) => getPostByFileName(slug));

//   return posts;
// }

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
  const postDate = postFileName.slice(0, 10); // YYYY-MM-DD
  const postSlug = postFileName.slice(11); // my-blog-post

  const fullPath = join(POSTS_DIR, `${postFileName}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return { ...data, content, date: postDate, slug: postSlug, fileName: postFileName } as Post;
}

export function getLastPageNumber(): number {
  const numberPosts = fs.readdirSync(POSTS_DIR).length;
  if (numberPosts <= POSTS_FIRST_PAGE) {
    return 1;
  } else {
    return Math.ceil((numberPosts - 1) / POSTS_PER_PAGE);
  }
}
