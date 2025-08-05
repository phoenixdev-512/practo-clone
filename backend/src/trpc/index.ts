// src/trpc/index.ts
import { initTRPC } from '@trpc/server';
import { doctorRouter } from './routers/doctors';

export const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const appRouter = router({
  doctors: doctorRouter,
});

export type AppRouter = typeof appRouter;
