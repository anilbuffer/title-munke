import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { AISettingsProvider } from '@/context/AISettingsContext';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'TITLE MUNKE — AI Settings | The Smarter Way to Search Property Records',
  description:
    'AI-powered title searches delivered with speed and accuracy. Helping brokers and agents make confident decisions.',
  icons: {
    icon: '/title-munke-logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${poppins.className} h-full antialiased`}>
      <body className={`${poppins.className} min-h-full flex flex-col bg-white`}>
        <AISettingsProvider>{children}</AISettingsProvider>
      </body>
    </html>
  );
}
