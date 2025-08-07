import { router } from '../index.js';
import { authRouter } from './auth.js'; // update the path as needed
import { doctorsRouter } from './doctors.js';

export const appRouter = router({
    doctors: doctorsRouter,
    auth: authRouter
});