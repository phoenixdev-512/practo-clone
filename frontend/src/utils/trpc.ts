// frontend/src/utils/trpc.ts
'use client';

import { createTRPCReact } from '@trpc/react-query';
// Update the import path below to the correct relative path where AppRouter is exported
import type { AppRouter } from '../../../backend/src/router'; // adjust this path if your AppRouter is in a different location
// If the path above is incorrect, update it to the correct relative path, for example:
// import type { AppRouter } from '../../backend/src/router';
// or wherever your AppRouter is actually exported from.

export const trpc = createTRPCReact<AppRouter>();
