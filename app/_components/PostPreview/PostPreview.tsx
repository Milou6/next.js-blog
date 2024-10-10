'use client';

import { useRouter } from 'next/navigation';
import { getPostUrl, Post } from '@/interfaces/post';
import Image from 'next/image';
import styles from './styles.module.scss';

export default function PostPreview({ post }: { post: Post }) {
  const router = useRouter();

  function handleClick() {
    router.push(getPostUrl(post));
  }

  return (
    <div className={styles.postPreview} onClick={handleClick}>
      <div className={styles.imgContainer}>
        <Image src={post.coverImage} fill style={{ objectFit: 'cover' }} alt="Picture of the author" />
      </div>

      <h6>{post.title}</h6>
      <p className={styles.excerpt}>{post.excerpt}</p>
    </div>
  );
}
