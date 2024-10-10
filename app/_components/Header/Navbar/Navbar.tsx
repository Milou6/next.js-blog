'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './styles.module.scss';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className={styles.navbar}>
      <Link className={`link ${pathname === '/' ? 'active' : ''}`} href="/">
        Home
      </Link>
      <Link className={`link ${pathname === '/about' ? 'active' : ''}`} href="/about">
        About
      </Link>
    </nav>
  );
}
