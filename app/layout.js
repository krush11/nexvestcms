import { Anek_Gujarati } from 'next/font/google';
const akshar = Anek_Gujarati({ subsets: ['latin'] });
import './globals.css'
import { Analytics } from '@vercel/analytics/react';
import NextAuthProvider from './NextAuthProvider';

export const metadata = {
  title: 'Nexvest CMS',
  description: 'Content Management Site for Nexvest',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className='dark'>
      <body className={akshar.className + ' dark:bg-slate-900 dark:text-neutral-200'}>
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
