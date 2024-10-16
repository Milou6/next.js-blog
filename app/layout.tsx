import type { Metadata } from 'next';
import Header from './_components/Header/Header';
import Footer from './_components/Footer/Footer';
import ColorPicker from './_components/ColorPicker/ColorPicker';

import './css/globals.scss';
import styles from './layout.module.scss';
import { AR_One_Sans } from 'next/font/google';

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
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=info,palette&display=block"
          rel="stylesheet"
        />
      </head>

      <body className={styles.body}>
        <Header></Header>

        <div className="fabContainer">
          <ColorPicker className="colorPicker"></ColorPicker>
        </div>

        <main>{children}</main>

        <Footer></Footer>
      </body>
    </html>
  );
}
