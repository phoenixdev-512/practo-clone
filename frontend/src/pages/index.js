import React, { useState } from 'react';
import { useRouter } from 'next/router';
import HeroSection from '../components/heroSection'

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
