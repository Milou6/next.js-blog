'use client';
import styles from './styles.module.scss';

export default function Footer() {
  return (
    <footer className={[styles.footer, 'secondary'].join(' ')}>
      {/* My little footer */}
      <div className="br-corner label-medium">
        Made with 💪 by&nbsp;
        <span>
          <a className="link" href="https://github.com/Milou6" target="_blank">
            Emile Haas
          </a>
        </span>
      </div>
    </footer>
  );
}
