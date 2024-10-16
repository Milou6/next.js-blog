'use client';

import styles from './styles.module.scss';

export default function Footer() {
  return (
    <footer className={[styles.footer, 'secondary'].join(' ')}>
      <div className="br-corner label-medium">
        Made with 💪 by&nbsp;
        <span>
          <a className="link label-medium" href="https://github.com/Milou6" target="_blank">
            Milou6
          </a>
        </span>
      </div>
    </footer>
  );
}
