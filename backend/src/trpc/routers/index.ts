import { router } from '../index';
import { authRouter } from './auth'; // update the path as needed

export const appRouter = router({
  auth: authRouter,
});
