import '../globals.css';
import React from 'react';
import { TRPCProvider } from './_trpc/Provider';

export const metadata = {
  title: 'Practo Clone',
  description: 'Doctor management system',
};

export default function RootLayout({ children }) {
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
