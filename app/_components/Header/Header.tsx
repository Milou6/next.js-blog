'use client';
import Navbar from './Navbar/Navbar';
import styles from './styles.module.scss';

export default function Header() {
  return (
    // <header className={[styles.header, 'primary-container'].join(' ')}>
    <header className={[styles.header].join(' ')}>
      <Navbar></Navbar>
    </header>
  );
}
