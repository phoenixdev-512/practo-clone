// server/routers/index.ts
import { router } from '../trpc';
import { doctorRouter } from './routers/doctor';

export const appRouter = router({
  doctor: doctorRouter,
});

export type AppRouter = typeof appRouter;
