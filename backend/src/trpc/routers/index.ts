import { router } from '../index';
import { authRouter } from './auth'; // update the path as needed
import { doctorRouter } from './doctors';

export const appRouter = router({
    doctor: doctorRouter,
    auth: authRouter
});

export type AppRouter = typeof appRouter;