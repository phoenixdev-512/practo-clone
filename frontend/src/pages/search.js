import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import DoctorCard from '../app/components/DoctorCard';

export default function SearchResultsPage() {
  const router = useRouter();
  const { location = '', specialty = '' } = router.query;

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    if (location || specialty) {
      fetch(`http://localhost:5000/api/doctors?location=${location}&specialty=${specialty}`)
        .then(res => res.json())
        .then(data => setDoctors(data))
        .catch(err => console.error('Fetch error:', err));
    }
  }, [location, specialty]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">
        Showing results for <span className="font-bold">{specialty}</span> in <span className="font-bold">{location}</span>
      </h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {doctors.map((doc, index) => (
          <DoctorCard key={index} doctor={doc} />
        ))}
      </div>
    </div>
  );
}
