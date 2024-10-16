import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';
import { Post } from '@/interfaces/post';
import { getSearchParamAsInt } from './utils';
import markdownToHtml from './markdownToHtml';

const POSTS_DIR = join(process.cwd(), '_posts');
const POSTS_PER_PAGE = 4;
const POSTS_FIRST_PAGE = POSTS_PER_PAGE + 1; // show extra PostHero on home page

export async function getLatestPosts({ page = undefined }: { page: string | undefined }): Promise<Post[]> {
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

  const posts: Promise<Post>[] = postsToFetch.map(async (filename) => getPostByFileName(filename));
  return await Promise.all(posts);
}

export async function getAllPosts(): Promise<Post[]> {
  const fileNames = fs.readdirSync(POSTS_DIR);
  fileNames.reverse();

  const posts: Promise<Post>[] = fileNames.map(async (filename) => getPostByFileName(filename));
  return await Promise.all(posts);
}

export async function getPostByYearAndSlug(year: string, slug: string): Promise<Post> {
  const fileNames = fs.readdirSync(POSTS_DIR).map((file) => file.replace(/\.md$/, ''));

  const matchingFile = fileNames.find((file) => file.endsWith(slug) && file.startsWith(year));
  if (!matchingFile) {
    throw new Error(`Cannot find blog matching year: ${year} & slug: ${slug}`);
  }

  return await getPostByFileName(matchingFile);
}

export async function getPostByFileName(filename: string): Promise<Post> {
  const postFileName = filename.replace(/\.md$/, '');
  const postDate = postFileName.slice(0, 10); // YYYY-MM-DD
  const postSlug = postFileName.slice(11); // my-blog-post

  const fullPath = join(POSTS_DIR, `${postFileName}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const postExcerpt = await markdownToHtml(data.excerpt || '');

  return { ...data, content, excerpt: postExcerpt, date: postDate, slug: postSlug, fileName: postFileName } as Post;
}

export function getLastPageNumber(): number {
  const numberPosts = fs.readdirSync(POSTS_DIR).length;
  if (numberPosts <= POSTS_FIRST_PAGE) {
    return 1;
  } else {
    return Math.ceil((numberPosts - 1) / POSTS_PER_PAGE);
  }
}
