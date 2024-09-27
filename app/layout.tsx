import type { Metadata } from 'next';
import Header from './_components/Header/Header';
import Footer from './_components/Footer/Footer';

import './globals.css';
import './css/typography.scss';
import { AR_One_Sans } from 'next/font/google';

const AROneSans = AR_One_Sans({
  subsets: ['latin'],
  variable: '--font-AR-one-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Blog',
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

        {children}

        <Footer></Footer>
      </body>
    </html>
  );
}
