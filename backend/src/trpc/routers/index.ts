import { router } from '../index';
import { authRouter } from './auth'; // example

export const appRouter = router({
  auth: authRouter,
});
