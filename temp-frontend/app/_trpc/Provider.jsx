'use client';

// Update the import path below if your trpc utility is located elsewhere
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import React from 'react';
import { createTRPCReact } from '@trpc/react-query';

const trpc = createTRPCReact();

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return ''; // browser should use relative path
  return 'http://localhost:4000'; // backend URL
};

export function TRPCProvider({ children }) {
  const [queryClient] = React.useState(() => new QueryClient());
  const [trpcClient] = React.useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/trpc`,
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}
