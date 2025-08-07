import '../globals.css';
import React from 'react';
import { TRPCProvider } from './_trpc/Provider';

export const metadata = {
  title: 'Practo Clone - Your Home for Health',
  description: 'Find and book the best doctors, clinics, and hospitals. Video consultations, medicine delivery, and health records.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="font-sans bg-gray-50 text-darkText antialiased">
        <TRPCProvider>
          {children}
        </TRPCProvider>
      </body>
    </html>
  );
}
