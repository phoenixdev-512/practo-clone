import { t } from '../index'; // `t` is from TRPC init

export const authRouter = t.router({
  hello: t.procedure.query(() => {
    return { msg: 'Hello from auth router' };
  }),
});
