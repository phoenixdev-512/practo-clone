// frontend/src/utils/trpc.js
'use client';

import { createTRPCReact } from '@trpc/react-query';
// Note: Since we've converted to JavaScript, we can't import types
// The AppRouter type is no longer needed for JavaScript usage

export const trpc = createTRPCReact();
