// src/trpc/routers/doctors.js
import { z } from 'zod';
import { publicProcedure } from '../../server/trpc'; // Ensure this path is correct
import { doctorRouter as baseDoctorRouter } from '../../server/routers/doctor';
// If '../trpc' does not exist, update to the correct path, for example:
// import { publicProcedure, router } from '../trpcUtils';
// or
// import { publicProcedure, router } from '../../trpc';

export const doctorRouter = router({
  getAll: publicProcedure.query(() => {
    return [
      { id: 1, name: 'Dr. John Watson', specialization: 'Cardiologist' },
      { id: 2, name: 'Dr. Lisa Ray', specialization: 'Dermatologist' },
    ];
  }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => {
      return { id: input.id, name: 'Dr. Placeholder', specialization: 'Neurologist' };
    }),
});

// If you need to use the imported doctorRouter, use 'baseDoctorRouter'
