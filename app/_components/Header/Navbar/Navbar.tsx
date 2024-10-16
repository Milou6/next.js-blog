'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './styles.module.scss';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className={styles.navbar}>
      <Link className={pathname === '/blog' ? 'btn-secondary' : ''} href="/blog">
        Home
      </Link>
      <Link className={pathname === '/about' ? 'btn-secondary' : ''} href="/about">
        About
      </Link>
    </nav>
  );
}
