// frontend/src/utils/trpc.ts
'use client';

import { createTRPCReact } from '@trpc/react-query';
// Update the import path below to the correct relative path where AppRouter is exported
import type { AppRouter } from '../../../backend/src/router'; // adjust this path if your AppRouter is in a different location

export const trpc = createTRPCReact<AppRouter>();
