// src/index.js
import express from 'express';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './trpc/index.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use(
  '/api/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: () => ({}),
  }),
);

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
