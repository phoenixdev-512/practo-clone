// src/trpc/index.js
import { initTRPC } from '@trpc/server';
import { appRouter } from './routers/index.js';

export const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;

export { appRouter };
