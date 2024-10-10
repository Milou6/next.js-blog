import type { Metadata } from 'next';
import Header from './_components/Header/Header';
import Footer from './_components/Footer/Footer';

import './css/globals.scss';
import { AR_One_Sans } from 'next/font/google';
import styles from './layout.module.scss';

const AROneSans = AR_One_Sans({
  subsets: ['latin'],
  variable: '--font-AR-one-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Next.js blog',
  description: 'A Next.js-powered blog',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={AROneSans.className}>
      <body>
        <Header></Header>

        <main className={styles.main}>{children}</main>

        <Footer></Footer>
      </body>
    </html>
  );
}
