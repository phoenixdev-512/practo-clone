// src/trpc/routers/doctors.ts
import { z } from 'zod';
import { publicProcedure, router } from '../../server/trpc'; // adjust the path if needed
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const doctorsData = JSON.parse(readFileSync(join(__dirname, '../../../doctors.json'), 'utf8'));

export const doctorsRouter = router({
  getAll: publicProcedure.query(() => {
    return doctorsData;
  }),

  getById: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      const doctorId = parseInt(input);
      const doctor = doctorsData.find((doc: any) => doc.id === doctorId);
      
      if (!doctor) {
        throw new Error(`Doctor with ID ${input} not found`);
      }
      
      return {
        id: doctor.id,
        name: doctor.name,
        specialty: doctor.specialty,
        location: doctor.location,
      };
    }),

  searchBySpecialty: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      const searchSpecialty = input.toLowerCase();
      const matchingDoctors = doctorsData.filter((doc: any) => 
        doc.specialty.toLowerCase().includes(searchSpecialty)
      );
      
      return matchingDoctors.map((doctor: any) => ({
        id: doctor.id,
        name: doctor.name,
        specialty: doctor.specialty,
        location: doctor.location,
      }));
    }),
});
