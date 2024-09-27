import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Header from './_components/Header/Header';
import Footer from './_components/Footer/Footer';

import './globals.css';
// import './css/_variables.scss';
import './css/typography.scss';
import { AR_One_Sans } from 'next/font/google';

// const geistSans = localFont({
//   src: './fonts/GeistVF.woff',
//   variable: '--font-geist-sans',
//   weight: '100 900',
// });

// const Roboto = localFont({src: './fonts/'})
const AROneSans = AR_One_Sans({
  subsets: ['latin'],
  variable: '--font-AR-one-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Blog',
  description: 'A Nextjs-powered blog',
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
