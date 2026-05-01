import type { Metadata } from 'next';
import { Nunito_Sans, Work_Sans } from 'next/font/google';
import './globals.css';

const workSans = Work_Sans({ subsets: ['latin'], variable: '--font-work-sans' });
const nunito = Nunito_Sans({ subsets: ['latin'], variable: '--font-nunito' });

export const metadata: Metadata = {
  title: 'Nia x You | Custom Prosthetic Covers',
  description: 'Customizable 3D-printed prosthetic covers for comfort, protection, and personal expression.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${workSans.variable} ${nunito.variable} font-body`}>{children}</body>
    </html>
  );
}
