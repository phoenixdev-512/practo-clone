'use client';
import React, { useState, useEffect } from 'react';
import DoctorDetails from '../../components/DoctorDetails';
import SpecialtySearch from '../../components/SpecialtySearch';

export default function DoctorListingPage() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState('1');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/doctors');
        if (!response.ok) {
          throw new Error('Failed to fetch doctors');
        }
        const data = await response.json();
        setDoctors(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) return <p>Loading doctors...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">Doctor Listing & Search Demo</h2>
      
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-6">
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

          {/* Specialty Search */}
          <SpecialtySearch />
        </div>

        {/* Right Column - All Doctors List */}
        <div>
          <h3 className="text-lg font-semibold mb-4">All Doctors (getAll API):</h3>
          <div className="space-y-4">
            {doctors.map((doctor) => (
              <div 
                key={doctor.id} 
                className="border border-gray-300 p-4 rounded-lg shadow hover:shadow-md transition-shadow bg-white"
              >
                <h4 className="text-lg font-semibold mb-2">{doctor.name}</h4>
                <p className="text-gray-600 mb-1">
                  <strong>Specialty:</strong> {doctor.specialty}
                </p>
                <p className="text-gray-600 mb-3">
                  <strong>Location:</strong> {doctor.location}
                </p>
                <button 
                  onClick={() => setSelectedDoctorId(doctor.id.toString())}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* API Endpoints Summary */}
      <div className="mt-8 p-4 bg-gray-100 border border-gray-300 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">🚀 Available API Endpoints:</h3>
        <ul className="text-sm space-y-1">
          <li><strong>getAll:</strong> <code>GET /api/doctors</code> - Fetch all doctors</li>
          <li><strong>getById:</strong> <code>GET /api/doctors/:id</code> - Fetch doctor by ID</li>
          <li><strong>searchBySpecialty:</strong> <code>GET /api/doctors/specialty/:specialty</code> - Search doctors by specialty</li>
        </ul>
      </div>
    </div>
  );
}
