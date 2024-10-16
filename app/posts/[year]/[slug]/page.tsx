import markdownToHtml from '@/lib/markdownToHtml';
import { notFound } from 'next/navigation';
import { getAllPosts, getLatestPosts, getPostByYearAndSlug } from '@/lib/api';
// import { Post } from '@/interfaces/post';

import styles from './styles.module.scss';
import PostHeroImage from '@/app/_components/PostHeroImage/PostHeroImage';

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    year: post.date.slice(0, 4),
    slug: post.slug,
  }));
}

async function getPost(params: { year: string; slug: string }) {
  const post = await getPostByYearAndSlug(params.year, params.slug);
  return post;
}

export default async function Post({ params }: { params: { year: string; slug: string } }) {
  const post = await getPost(params);
  if (!post) {
    return notFound();
  }

  const postContent = await markdownToHtml(post.content || '');

  return (
    <div id="article" className={styles.articlePage}>
      <PostHeroImage imgSrc={post.coverImage} imgCaption={post.imageCaption} imgAlt={post.imageAlt}></PostHeroImage>

      <h1 className="title">{post.title}</h1>

      <article dangerouslySetInnerHTML={{ __html: postContent }}></article>
    </div>
  );
}
