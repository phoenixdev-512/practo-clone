import '../globals.css';
import React from 'react';

export const metadata = {
  title: 'Practo Clone',
  description: 'Doctor management system',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
