import { getLastPageNumber, getLatestPosts } from '@/lib/api';
import styles from './page.module.scss';
import PostHero from '../_components/PostHero/PostHero';
import PostsGrid from '../_components/PostsGrid/PostsGrid';
import { notFound } from 'next/navigation';
import PageNavigator from '../_components/PageNavigator/PageNavigator';

export default async function Page() {
  const posts = await getLatestPosts({ page: undefined });
  if (posts.length == 0) {
    return notFound();
  }

  const pageNumber = 1;
  const lastPageNumber = getLastPageNumber();

  return (
    <div className={styles.homePage}>
      <PostHero post={posts[0]}></PostHero>

      <div className="divider"></div>

      <PostsGrid posts={posts.slice(1)}></PostsGrid>
      <PageNavigator currentPage={pageNumber} lastPage={lastPageNumber}></PageNavigator>
    </div>
  );
}
