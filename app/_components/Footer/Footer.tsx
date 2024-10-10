'use client';
import styles from './styles.module.scss';

export default function Footer() {
  return (
    <footer className={[styles.footer, 'secondary'].join(' ')}>
      My little footer
      <div className="br-corner">
        Made with 💪 by&nbsp;
        <span>
          <a href="https://github.com/Milou6" target="_blank">
            Emile Haas
          </a>
        </span>
      </div>
    </footer>
  );
}
