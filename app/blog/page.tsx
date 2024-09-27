import { getAllPosts } from '@/lib/api';
import styles from './page.module.css';
import PostHero from '../_components/PostHero/PostHero';
import PostsGrid from '../_components/PostsGrid/PostsGrid';

export default function BlogHome() {
  const allPosts = getAllPosts();

  const heroPost = allPosts[0];

  const morePosts = allPosts.slice(1);

  return (
    <div className={styles.homePage}>
      <main className={styles.main}>
        <PostHero post={heroPost}></PostHero>

        <PostsGrid posts={morePosts}></PostsGrid>
      </main>
    </div>
  );
}
