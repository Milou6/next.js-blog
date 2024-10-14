'use client';

import { Post } from '@/interfaces/post';
import styles from './styles.module.scss';
import PostPreview from '../PostPreview/PostPreview';

export default function PostsGrid({ posts }: { posts: Post[] }) {
  return (
    <div className={styles.postsGrid}>
      {posts.map((post) => (
        <PostPreview post={post} key={post.date + post.slug}></PostPreview>
      ))}
    </div>
  );
}
