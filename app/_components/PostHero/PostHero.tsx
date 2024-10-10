'use client';

import { useRouter } from 'next/navigation';
import { getPostUrl, Post } from '@/interfaces/post';
import Image from 'next/image';
import styles from './styles.module.scss';

export default function PostHero({ post }: { post: Post }) {
  const router = useRouter();

  function handleClick() {
    router.push(getPostUrl(post));
  }

  return (
    <div className={styles.postHero}>
      <div className={styles.imgContainer}>
        <Image
          src={post.coverImage}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover' }}
          alt="Picture of the author"
          onClick={handleClick}
        />
      </div>

      <h3 className={styles.postTitle} onClick={handleClick}>
        {post.title}
      </h3>
      <p className="label-small on-surface-variant">{post.date}</p>
      <p className={styles.excerpt}>{post.excerpt}</p>
    </div>
  );
}
