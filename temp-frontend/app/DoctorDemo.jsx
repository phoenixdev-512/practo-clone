'use client';

import { useState, useEffect } from 'react';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  location: string;
}

export default function DoctorDemo() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    specialty: '',
    location: ''
  });

  // Fetch all doctors
  const fetchDoctors = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/doctors');
      const data = await response.json();
      setDoctors(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      setLoading(false);
    }
  };

  // Add new doctor
  const addDoctor = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/doctors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDoctor),
      });
      const result = await response.json();
      
      if (response.ok) {
        setNewDoctor({ name: '', specialty: '', location: '' });
        fetchDoctors(); // Refresh the list
      }
    } catch (error) {
      console.error('Error adding doctor:', error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-blue-600">
        Practo Clone - Doctor Management
      </h1>
      
      {/* Add New Doctor Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Doctor</h2>
        <form onSubmit={addDoctor} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Doctor Name"
              value={newDoctor.name}
              onChange={(e) => setNewDoctor({...newDoctor, name: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Specialty"
              value={newDoctor.specialty}
              onChange={(e) => setNewDoctor({...newDoctor, specialty: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Location"
              value={newDoctor.location}
              onChange={(e) => setNewDoctor({...newDoctor, location: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Doctor
          </button>
        </form>
      </div>

      {/* Doctors List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">All Doctors ({doctors.length})</h2>
        <div className="grid gap-4">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="border border-gray-200 p-4 rounded">
              <h3 className="font-semibold text-lg">{doctor.name}</h3>
              <p className="text-gray-600">Specialty: {doctor.specialty}</p>
              <p className="text-gray-600">Location: {doctor.location}</p>
              <p className="text-sm text-gray-500">ID: {doctor.id}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
