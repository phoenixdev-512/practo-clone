// server/routers/index.js
import { router } from '../trpc';
import { doctorRouter } from './routers/doctor';

export const appRouter = router({
  doctor: doctorRouter,
});
