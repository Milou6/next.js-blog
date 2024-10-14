'use client';

import Image from 'next/image';
import styles from './styles.module.scss';
import { useState } from 'react';

export default function PostHeroImage({ imgSrc, imgCaption }: { imgSrc: string; imgCaption: string }) {
  const [showInfo, setShowInfo] = useState(false);

  const toggleVisibilityInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
    <figure className={styles.heroImage}>
      {/* <Image src={imgSrc} width={600} height={350} style={{ objectFit: 'contain' }} alt="Picture of the author" /> */}
      {/* <Image src={imgSrc} fill style={{ objectFit: 'contain' }} alt="Picture of the author" /> */}

      <Image src={imgSrc} fill sizes="100vw" style={{ objectFit: 'cover' }} alt="Picture of the author" />

      <figcaption>
        {showInfo && <span className="label-small" dangerouslySetInnerHTML={{ __html: imgCaption }}></span>}
        <span className={['info-icon', 'material-symbols-outlined'].join(' ')} onClick={toggleVisibilityInfo}>
          info
        </span>
      </figcaption>
    </figure>
  );
}
