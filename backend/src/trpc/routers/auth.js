import { publicProcedure, router } from '../config.js'; // Import from config to avoid circular imports

export const authRouter = router({
  hello: publicProcedure.query(() => {
    return { msg: 'Hello from auth router' };
  }),
});
