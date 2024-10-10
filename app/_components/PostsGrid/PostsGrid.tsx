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

    // <div className={styles.postHero}>
    //   <div className={styles.imgContainer}>
    //     <Image src={post.coverImage} fill sizes="100vw" style={{ objectFit: 'cover' }} alt="Picture of the author" />
    //   </div>

    //   <h3>{post.title}</h3>
    //   <p className={styles.excerpt}>{post.excerpt}</p>
    // </div>
  );
}
