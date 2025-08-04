import React, { useState } from 'react';
import { useRouter } from 'next/router';
import HeroSection from '../components/HeroSection';
import SearchBar from '../components/SearchBar';
import DoctorList from '../components/DoctorList';

const mockDoctors = [
    { name: "Dr. Priya Sharma", specialty: "Dentist", location: "Bangalore", experience: 8, fee: 500 },
    { name: "Dr. Arjun Rao", specialty: "Cardiologist", location: "Mumbai", experience: 12, fee: 1200 },
    { name: "Dr. Neha Verma", specialty: "Dermatologist", location: "Delhi", experience: 5, fee: 700 },
];
export default function HomePage() {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [specialty, setSpecialty] = useState('');

  const handleSearch = () => {
    router.push(`/doctors?location=${location}&specialty=${specialty}`);
  };

  return (
    <main>
        <HeroSection />
    <div style={{ padding: '2rem' }}>
        <SearchBar />
        <DoctorList doctors={mockDoctors}/>
      <h1>Find the right doctor</h1>
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={e => setLocation(e.target.value)}
        style={{ marginRight: '1rem' }}
        />
      <input
        type="text"
        placeholder="Specialty"
        value={specialty}
        onChange={e => setSpecialty(e.target.value)}
        style={{ marginRight: '1rem' }}
        />
      <button onClick={handleSearch}>Search</button>
    </div>
    </main>
  );
}
