// src/trpc/routers/doctors.js
import { z } from 'zod';
import { publicProcedure, router } from '../index.js'; // Import both publicProcedure and router
import { doctorRouter as baseDoctorRouter } from '../../server/routers/doctor.js';

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
