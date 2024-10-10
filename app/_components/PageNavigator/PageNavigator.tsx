import styles from './styles.module.scss';
import Link from 'next/link';

export default function PageNavigator({
  currentPage,
  lastPage,
  showFirstAndLast = false,
}: {
  currentPage: number;
  lastPage: number;
  showFirstAndLast?: boolean;
}) {
  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;

  return (
    <nav className={styles.pageNav}>
      {showFirstAndLast && currentPage > 2 && (
        <>
          <Link key={1} href={{ pathname: '/blog' }}>
            {1}
          </Link>
          ..............
        </>
      )}

      {previousPage > 0 && (
        <Link
          className="link btn-secondary"
          key={previousPage}
          href={{ pathname: '/blog', query: { page: previousPage } }}
          draggable={false}
        >
          {previousPage}
        </Link>
      )}

      <Link
        className="link active btn-primary"
        key={currentPage}
        href={{ pathname: '/blog', query: { page: currentPage } }}
        draggable={false}
      >
        {currentPage}
      </Link>

      {nextPage <= lastPage && (
        <Link
          className="link btn-secondary"
          key={nextPage}
          href={{ pathname: '/blog', query: { page: nextPage } }}
          draggable={false}
        >
          {nextPage}
        </Link>
      )}

      {showFirstAndLast && lastPage > nextPage && (
        <>
          ..............
          <Link key={lastPage} href={{ pathname: '/blog', query: { page: lastPage } }}>
            {lastPage}
          </Link>
        </>
      )}
    </nav>
  );
}
