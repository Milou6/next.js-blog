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

      <h2 className={styles.postTitle} onClick={handleClick}>
        {post.title}
      </h2>
      <p className="label-medium on-surface-variant">
        {new Date(post.date).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>
      <div className={styles.excerpt} dangerouslySetInnerHTML={{ __html: post.excerpt }}></div>
    </div>
  );
}
