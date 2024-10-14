import { getLastPageNumber, getLatestPosts } from '@/lib/api';
import styles from './page.module.scss';
import PostHero from '../_components/PostHero/PostHero';
import PostsGrid from '../_components/PostsGrid/PostsGrid';
import { notFound } from 'next/navigation';
import { getSearchParamAsInt } from '@/lib/utils';
import PageNavigator from '../_components/PageNavigator/PageNavigator';

export default async function Page({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const posts = await getLatestPosts({ page: searchParams.page });
  if (posts.length == 0) {
    return notFound();
  }

  const pageNumber = getSearchParamAsInt(searchParams.page) ?? 1;
  const lastPageNumber = getLastPageNumber();

  if (pageNumber > 1) {
    return (
      <div className={styles.homePage}>
        <PostsGrid posts={posts}></PostsGrid>

        <PageNavigator currentPage={pageNumber} lastPage={lastPageNumber}></PageNavigator>
      </div>
    );
  } else {
    return (
      <div className={styles.homePage}>
        <PostHero post={posts[0]}></PostHero>

        <div className="divider"></div>

        <PostsGrid posts={posts.slice(1)}></PostsGrid>
        <PageNavigator currentPage={pageNumber} lastPage={lastPageNumber}></PageNavigator>
      </div>
    );
  }
}
