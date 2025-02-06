// src/app/layout.js
import { Inter } from 'next/font/google';
import './globals.css';

export const runtime = 'edge';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Nextjs Connect',
  description: 'Nextjs Connect',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gray-50`}>
        {children}
      </body>
    </html>
  );
}
