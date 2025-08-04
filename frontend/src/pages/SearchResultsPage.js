'use client';

import { useSearchParams } from 'next/navigation';
import DoctorCard from '@/components/DoctorCard';

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const location = searchParams.get('location');
  const specialty = searchParams.get('specialty');

  const dummyDoctors = [
    {
      name: "Dr. Anjali Mehra",
      qualification: "MBBS, MD (Dermatology)",
      specialty: "Dermatologist",
      experience: 8,
      location: "Indiranagar, Bangalore",
      image: "/doctors/anjali.jpg",
    },
    {
      name: "Dr. Rahul Sharma",
      qualification: "BDS, MDS (Orthodontics)",
      specialty: "Dentist",
      experience: 5,
      location: "Koramangala, Bangalore",
      image: "/doctors/rahul.jpg",
    },
    {
      name: "Dr. Neha Gupta",
      qualification: "MBBS, MS (Gynecology)",
      specialty: "Gynecologist",
      experience: 10,
      location: "Jayanagar, Bangalore",
      image: "/doctors/neha.jpg",
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-xl md:text-2xl font-semibold mb-6">
        {specialty && location ? (
          <>
            Showing <span className="text-blue-600">{specialty}</span> doctors in <span className="text-blue-600">{location}</span>
          </>
        ) : (
          "Showing All Doctors"
        )}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyDoctors.map((doctor, index) => (
          <DoctorCard key={index} doctor={doctor} />
        ))}
      </div>
    </div>
  );
}
