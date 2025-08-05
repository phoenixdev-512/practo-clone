'use client';
import React from 'react';
// Update the import path below if your trpc file is located elsewhere, e.g.:
import { trpc } from '../../utils/trpc';
// Or provide the correct relative path to where your trpc.ts file exists

export default function DoctorListingPage() {
  const { data, isLoading, error } = trpc.doctors.getAll.useQuery();

  if (isLoading) return <p>Loading doctors...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Available Doctors</h2>
      <ul className="space-y-4">
        {data?.map((doctor) => (
          <li key={doctor.id} className="border p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{doctor.name}</h3>
            <p>{doctor.specialty}</p>
            <p>{doctor.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
