import { publicProcedure, router } from '../index.js'; // Import both publicProcedure and router

export const authRouter = router({
  hello: publicProcedure.query(() => {
    return { msg: 'Hello from auth router' };
  }),
});
