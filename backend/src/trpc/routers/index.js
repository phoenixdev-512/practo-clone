import { router } from '../index';
import { authRouter } from './auth'; // update the path as needed
import { doctorsRouter } from './doctors';

export const appRouter = router({
    doctors: doctorsRouter,
    auth: authRouter
});