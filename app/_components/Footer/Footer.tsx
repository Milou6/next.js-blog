import styles from './styles.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <a href="http://" target="_blank" rel="noopener noreferrer">
        Link1
      </a>
      <a href="http://" target="_blank" rel="noopener noreferrer">
        Link2
      </a>
    </footer>
  );
}
