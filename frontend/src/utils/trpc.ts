// frontend/src/utils/trpc.ts
'use client';

import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../../../backend/src/trpc/router'; // adjust if needed

export const trpc = createTRPCReact<AppRouter>();
