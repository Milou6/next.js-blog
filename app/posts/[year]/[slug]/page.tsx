import markdownToHtml from '@/lib/markdownToHtml';
import { notFound } from 'next/navigation';
import { getPostByYearAndSlug } from '@/lib/api';

import styles from './styles.module.scss';
import PostHeroImage from '@/app/_components/PostHeroImage/PostHeroImage';

export default async function Post({ params }: { params: { year: string; slug: string } }) {
  const post = await getPostByYearAndSlug(params.year, params.slug);
  if (!post) {
    return notFound();
  }

  const postContent = await markdownToHtml(post.content || '');

  return (
    <div id="article" className={styles.articlePage}>
      <PostHeroImage imgSrc={post.coverImage} imgCaption={post.imageCaption} imgAlt={post.imageAlt}></PostHeroImage>

      <h1 className="title">{post.title}</h1>

      <article>
        <div dangerouslySetInnerHTML={{ __html: postContent }} />
      </article>
    </div>
  );
}
