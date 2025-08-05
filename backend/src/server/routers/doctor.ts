// server/routers/doctor.ts
import { publicProcedure, router } from '../trpc';
import { z } from 'zod';

export const doctorRouter = router({
  getDoctors: publicProcedure.query(() => {
    // For now, return static mock data
    return [
      {
        id: '1',
        name: 'Dr. Ayesha Khan',
        speciality: 'Cardiologist',
        location: 'Bangalore',
        fee: 500,
      },
      {
        id: '2',
        name: 'Dr. Rohit Mehra',
        speciality: 'Dermatologist',
        location: 'Mumbai',
        fee: 700,
      },
      {
        id: '3',
        name: 'Dr. Neha Gupta',
        speciality: 'Neurologist',
        location: 'Delhi',
        fee: 1000,
      },
    ];
  }),
});
