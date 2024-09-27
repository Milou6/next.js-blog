import Navbar from './Navbar/Navbar';
import styles from './styles.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <Navbar></Navbar>
    </header>
  );
}
