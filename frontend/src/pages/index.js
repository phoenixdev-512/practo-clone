import React, { useState } from 'react';
import { useRouter } from 'next/router';
import HeroSection from '../components/heroSection';
import SearchBar from '../components/SearchBar';
import DoctorList from '../components/DoctorList';
import Navbar from '../components/NavBar';

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
    <main className="bg-gray-50 min-h-screen">
    <Navbar />
    <heroSection />
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Find the right doctor</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Enter Location"
              value={location}
              onChange={e => setLocation(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Enter Specialty"
              value={specialty}
              onChange={e => setSpecialty(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all"
            >
              Search
            </button>
          </div>
        </div>

        <DoctorList doctors={mockDoctors} />
      </section>
    </main>
  );
}
