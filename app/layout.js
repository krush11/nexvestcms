import { Anek_Gujarati } from 'next/font/google';
const akshar = Anek_Gujarati({ subsets: ['latin'] });
import './globals.css'

export const metadata = {
  title: 'Nexvest CMS',
  description: 'Content Management Site for Nexvest',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className='dark'>
      <body className={akshar.className+ ' dark:bg-[#1a1c1e] dark:text-neutral-200'}>
        {children}
      </body>
    </html>
  )
}
