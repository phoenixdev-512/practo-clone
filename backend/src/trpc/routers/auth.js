import { t } from '../index.js'; // `t` is from TRPC init

export const authRouter = t.router({
  hello: t.procedure.query(() => {
    return { msg: 'Hello from auth router' };
  }),
});
