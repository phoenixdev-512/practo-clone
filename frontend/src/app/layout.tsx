// Update the import path below if the actual location is different, e.g. '../../_trpc/Provider' or './_trpc/Provider'
import { TRPCProvider } from './_trpc/Provider';
import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TRPCProvider>{children}</TRPCProvider>
      </body>
    </html>
  );
}
