import Image from 'next/image';
import styles from './styles.module.css';

export default function PostHeroImage({ imgSrc }: { imgSrc: string }) {
  return (
    <div className={styles.heroImage}>
      {/* <Image src={imgSrc} width={600} height={350} style={{ objectFit: 'contain' }} alt="Picture of the author" /> */}
      {/* <Image src={imgSrc} fill style={{ objectFit: 'contain' }} alt="Picture of the author" /> */}
      <Image src={imgSrc} fill sizes="100vw" style={{ objectFit: 'cover' }} alt="Picture of the author" />
    </div>
  );
}
