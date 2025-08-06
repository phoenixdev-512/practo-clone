'use client';
import React, { useState, useEffect } from 'react';
import DoctorDetails from '../../components/DoctorDetails';
import SpecialtySearch from '../../components/SpecialtySearch';
import AddDoctorForm from '../../components/AddDoctorForm';
import CitySearch from '../../components/CitySearch';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  location: string;
}

export default function DoctorListingPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('1');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDoctors = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/doctors');
      if (!response.ok) {
        throw new Error('Failed to fetch doctors');
      }
      const data: Doctor[] = await response.json();
      setDoctors(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  function handleDoctorAdded(newDoctor: Doctor) {
        // Refresh the doctors list when a new doctor is added
        fetchDoctors();
        // Optionally select the new doctor
        setSelectedDoctorId(newDoctor.id.toString());
    }

  if (loading) return <p>Loading doctors...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">Complete Doctor Management System</h2>
      
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Forms and Search */}
        <div className="space-y-6">
          {/* Add Doctor Form */}
          <AddDoctorForm onDoctorAdded={handleDoctorAdded} />
          
          {/* Doctor Selection */}
          <div className="bg-white p-4 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Select Doctor (getById API):</h3>
            <label className="block text-sm font-medium mb-2">
              Choose a doctor to view details:
            </label>
            <select 
              value={selectedDoctorId} 
              onChange={(e) => setSelectedDoctorId(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            >
              <option value="">-- Select a Doctor --</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id.toString()}>
                  {doctor.name} - {doctor.specialty}
                </option>
              ))}
            </select>
          </div>

          {/* Selected Doctor Details */}
          <DoctorDetails doctorId={selectedDoctorId} />
        </div>

        {/* Middle Column - Search Components */}
        <div className="space-y-6">
          <SpecialtySearch />
          <CitySearch />
        </div>

        {/* Right Column - All Doctors List */}
        <div>
          <h3 className="text-lg font-semibold mb-4">All Doctors (getAll API):</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {doctors.map((doctor) => (
              <div 
                key={doctor.id} 
                className="border border-gray-300 p-3 rounded-lg shadow hover:shadow-md transition-shadow bg-white"
              >
                <h4 className="font-semibold mb-1">{doctor.name}</h4>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Specialty:</strong> {doctor.specialty}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Location:</strong> {doctor.location}
                </p>
                <button 
                  onClick={() => setSelectedDoctorId(doctor.id.toString())}
                  className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
          <div className="mt-3 text-sm text-gray-500">
            Total: {doctors.length} doctors
          </div>
        </div>
      </div>

      {/* API Endpoints Summary */}
      <div className="mt-8 p-4 bg-gray-100 border border-gray-300 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">🚀 Available API Endpoints:</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium mb-1">Queries:</h4>
            <ul className="space-y-1">
              <li><strong>getAll:</strong> <code>GET /api/doctors</code></li>
              <li><strong>getById:</strong> <code>GET /api/doctors/:id</code></li>
              <li><strong>searchBySpecialty:</strong> <code>GET /api/doctors/specialty/:specialty</code></li>
              <li><strong>getDoctorsByCity:</strong> <code>GET /api/doctors/city/:city</code></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-1">Mutations:</h4>
            <ul className="space-y-1">
              <li><strong>addDoctor:</strong> <code>POST /api/doctors</code></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
