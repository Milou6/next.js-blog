import markdownToHtml from '@/lib/markdownToHtml';
import { notFound } from 'next/navigation';
import { getPostByYearAndSlug } from '@/lib/api';

import styles from './styles.module.css';
import PostHeroImage from '@/app/_components/PostHeroImage/PostHeroImage';

export default async function Post({ params }: { params: { year: string; slug: string } }) {
  const post = getPostByYearAndSlug(params.year, params.slug);
  if (!post) {
    return notFound();
  }

  const postContent = await markdownToHtml(post.content || '');

  return (
    <>
      <PostHeroImage imgSrc={post.coverImage}></PostHeroImage>

      <h4>{post.title}</h4>

      <article className={styles.post}>
        <div dangerouslySetInnerHTML={{ __html: postContent }} />
      </article>
    </>
  );
}
