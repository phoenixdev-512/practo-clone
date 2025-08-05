'use client';
import React from 'react';
// Update the import path below if your trpc file is located elsewhere, e.g.:
import { trpc } from '../../utils/trpc';
// Or provide the correct relative path to where your trpc.ts file exists

export default function DoctorList() {
  const { data, isLoading } = trpc.doctors.getAll.useQuery();

  if (isLoading) return <p>Loading...</p>;
  return (
    <div>
      {data?.map(doc => (
        <div key={doc.id}>
          <h3>{doc.name}</h3>
          <p>{doc.specialty} - {doc.location}</p>
        </div>
      ))}
    </div>
  );
}
