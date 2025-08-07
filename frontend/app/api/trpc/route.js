import { appRouter } from "../../../../../backend/src/trpc/index.js";
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

const handler = (req) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => ({}),
  });

export { handler as GET, handler as POST };
