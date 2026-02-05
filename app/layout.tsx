import './globals.css';
import type { Metadata } from 'next';
import { LocaleProvider } from '@/components/LocaleProvider';
import { NavBar } from '@/components/NavBar';

export const metadata: Metadata = {
  title: 'Daniel Bonds — Portfolio',
  description: 'Ultra-modern cinematic portfolio for Daniel Bonds.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body>
        <LocaleProvider>
          <NavBar />
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
