import type { Metadata } from 'next';
import Header from './_components/Header/Header';
import Footer from './_components/Footer/Footer';

import './css/globals.scss';
import styles from './layout.module.scss';
import { AR_One_Sans } from 'next/font/google';
import dynamic from 'next/dynamic';

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
  const ColorPickerDynamic = dynamic(() => import('@/app/_components/ColorPicker/ColorPicker'), { ssr: false });

  return (
    <html lang="en" suppressHydrationWarning className={AROneSans.className}>
      <head>
        <script type="text/javascript" src="bundle.js"></script>

        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=info,palette&display=block"
          rel="stylesheet"
        />
      </head>

      <body className={styles.body}>
        <Header></Header>

        <div className="fabContainer">
          <ColorPickerDynamic className="colorPicker"></ColorPickerDynamic>
        </div>

        <main>{children}</main>

        <Footer></Footer>
      </body>
    </html>
  );
}
