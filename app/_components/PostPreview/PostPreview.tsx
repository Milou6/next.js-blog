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
    <div className={styles.postPreview}>
      <div className="img-container" onClick={handleClick}>
        <Image
          src={post.coverImage}
          fill
          sizes="(max-width: 870px) 100vw, 50vw"
          style={{ objectFit: 'cover' }}
          alt={post.imageAlt}
        />
      </div>

      <div className="titleContainer">
        <h6 className="title" onClick={handleClick}>
          {post.title}
        </h6>
        <span className="postDetails">
          <span className="postDate label-medium on-surface-variant" suppressHydrationWarning>
            {new Date(post.date).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>

          <span className="post-tags">
            {post.tags.map((tag) => (
              <div key={tag} className="chip secondary-container label-small">
                {tag}
              </div>
            ))}
          </span>
        </span>
      </div>

      <div className={styles.excerpt} dangerouslySetInnerHTML={{ __html: post.excerpt }}></div>
    </div>
  );
}
