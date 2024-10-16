'use client';

import Image from 'next/image';
import styles from './styles.module.scss';
import { useState } from 'react';

export default function PostHeroImage({
  imgSrc,
  imgCaption,
  imgAlt,
}: {
  imgSrc: string;
  imgCaption: string;
  imgAlt: string;
}) {
  const [showInfo, setShowInfo] = useState(false);

  const toggleVisibilityInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
    <figure className={styles.heroImage}>
      <Image src={imgSrc} priority fill sizes="100vw" style={{ objectFit: 'cover' }} alt={imgAlt} />

      <figcaption>
        {showInfo && <span className="label-small" dangerouslySetInnerHTML={{ __html: imgCaption }}></span>}
        <span className={['info-icon', 'material-symbols-outlined'].join(' ')} onClick={toggleVisibilityInfo}>
          info
        </span>
      </figcaption>
    </figure>
  );
}
