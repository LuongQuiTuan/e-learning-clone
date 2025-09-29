import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '../lib/theme';
import AppLayout from '../components/layout/AppLayout';

import ToastProvider from '@/components/ToastProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'E-learning Clone',
  description: 'Clone of an E-learning platform built with Next.js and Material-UI',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ToastProvider>
            <AppLayout>{children}</AppLayout>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
