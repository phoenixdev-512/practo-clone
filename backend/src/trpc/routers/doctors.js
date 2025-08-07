// src/trpc/routers/doctors.js
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
      const doctor = doctorsData.find((doc) => doc.id === doctorId);
      
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
      const matchingDoctors = doctorsData.filter((doc) => 
        doc.specialty.toLowerCase().includes(searchSpecialty)
      );
      
      return matchingDoctors.map((doctor) => ({
        id: doctor.id,
        name: doctor.name,
        specialty: doctor.specialty,
        location: doctor.location,
      }));
    }),

  addDoctor: publicProcedure
    .input(
      z.object({
        name: z.string(),
        specialty: z.string(),
        location: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      // In real app, insert into DB
      console.log("Adding doctor:", input);

      // Generate new ID (in real app, this would be handled by database)
      const newId = Math.max(...doctorsData.map((doc) => doc.id)) + 1;
      
      const newDoctor = {
        id: newId,
        name: input.name.trim(),
        specialty: input.specialty.trim(),
        location: input.location.trim(),
      };

      // Add to in-memory array (in real app, save to database)
      doctorsData.push(newDoctor);

      return newDoctor;
    }),

  getDoctorsByCity: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      const searchCity = input.toLowerCase();
      const matchingDoctors = doctorsData.filter((doc) => 
        doc.location.toLowerCase().includes(searchCity)
      );
      
      return matchingDoctors.map((doctor) => ({
        id: doctor.id,
        name: doctor.name,
        specialty: doctor.specialty,
        location: doctor.location,
      }));
    }),
});
