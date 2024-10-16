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
      <div className="imgContainer">
        <Image
          src={post.coverImage}
          priority
          fill
          sizes="100vw"
          style={{ objectFit: 'cover' }}
          alt={post.imageAlt}
          onClick={handleClick}
        />
      </div>

      <div className="titleContainer">
        <h2 className="title" onClick={handleClick}>
          {post.title}
        </h2>
        <span className="postDetails">
          <span className="postDate label-medium on-surface-variant">
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

      <div className="excerpt" dangerouslySetInnerHTML={{ __html: post.excerpt }}></div>
    </div>
  );
}
