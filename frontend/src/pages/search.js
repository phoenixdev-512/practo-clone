import { useRouter } from 'next/router';
import DoctorCard from '../components/DoctorCard';

export default function SearchResultsPage() {
  const router = useRouter();
  const { location, specialty } = router.query;

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
    <div className="min-h-screen bg-gray-50 px-4 sm:px-8 md:px-16 py-10">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
        {specialty && location ? (
          <>
            Top <span className="text-blue-600">{specialty}</span> doctors in <span className="text-blue-600">{location}</span>
          </>
        ) : (
          "Top Doctors Near You"
        )}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {dummyDoctors.map((doctor, index) => (
          <DoctorCard key={index} doctor={doctor} />
        ))}
      </div>
    </div>
  );
}
