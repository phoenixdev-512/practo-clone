// src/trpc/routers/doctors.ts
import { z } from 'zod';
import { publicProcedure, router } from '../../server/trpc'; // adjust the path if needed

export const doctorRouter = router({
  getAll: publicProcedure.query(() => {
     return [
      { id: 1, name: 'Dr. John Doe', specialty: 'Cardiology', location: 'Bangalore' },
      { id: 2, name: 'Dr. Jane Smith', specialty: 'Dermatology', location: 'Mumbai' }
    ];
  }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }: { input: { id: number } }) => {
      return { id: input.id, name: 'Dr. Placeholder', specialization: 'Neurologist' };
    }),
});
