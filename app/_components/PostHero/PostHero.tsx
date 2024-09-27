'use client';

import { useRouter } from 'next/navigation';
import { Post } from '@/interfaces/post';
import Image from 'next/image';
import styles from './styles.module.css';

export default function PostHero({ post }: { post: Post }) {
  const router = useRouter();

  function handleClick() {
    router.push(`/posts/${post.slug}`);
  }

  return (
    <div className={styles.postHero} onClick={handleClick}>
      <div className={styles.imgContainer}>
        <Image
          src={post.coverImage}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover' }}
          alt="Picture of the author"
        />
      </div>

      <h3>{post.title}</h3>
      <p className={styles.excerpt}>{post.excerpt}</p>
    </div>
  );
}
