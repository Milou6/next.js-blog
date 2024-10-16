import { getLastPageNumber, getLatestPosts } from '@/lib/api';
import styles from './page.module.scss';
import { notFound } from 'next/navigation';
import { getSearchParamAsInt } from '@/lib/utils';
import PostsGrid from '@/app/_components/PostsGrid/PostsGrid';
import PageNavigator from '@/app/_components/PageNavigator/PageNavigator';

export async function generateStaticParams() {
  const params = [];
  const nberOfPages = await getLastPageNumber();

  for (let i = 2; i <= nberOfPages; i++) {
    params.push({ page: i.toString() });
  }
  return params;
}

async function getPostsForPage(page: string) {
  const posts = await getLatestPosts({ page: page });
  return posts;
}

export default async function Page({ params }: { params: { page: string } }) {
  const posts = await getPostsForPage(params.page);
  if (posts.length == 0) {
    return notFound();
  }

  const pageNumber = getSearchParamAsInt(params.page) ?? 1;
  const lastPageNumber = getLastPageNumber();

  return (
    <div className={styles.homePage}>
      <PostsGrid posts={posts}></PostsGrid>

      <PageNavigator currentPage={pageNumber} lastPage={lastPageNumber}></PageNavigator>
    </div>
  );
}
