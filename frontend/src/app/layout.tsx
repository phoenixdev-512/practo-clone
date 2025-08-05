// src/app/layout.tsx
import './globals.css'; // if using Tailwind
import { TRPCProvider } from './_trpc/Provider';
import React from 'react';

export const metadata = {
  title: 'Practo Clone',
  description: 'TRPC-powered frontend',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TRPCProvider>
          {children}
        </TRPCProvider>
      </body>
    </html>
  );
}
