// server/routers/index.js
import { router } from '../trpc.js';
import { doctorRouter } from './routers/doctor.js';

export const appRouter = router({
  doctor: doctorRouter,
});
