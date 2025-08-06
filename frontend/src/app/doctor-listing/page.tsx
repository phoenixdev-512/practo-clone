'use client';
import React, { useState, useEffect } from 'react';
import DoctorDetails from '../../components/DoctorDetails';

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
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Doctor Listing & Details Demo</h2>
      
      {/* Doctor Selection Dropdown */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Select a doctor to view details:
        </label>
        <select 
          value={selectedDoctorId} 
          onChange={(e) => setSelectedDoctorId(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full max-w-md"
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
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Doctor Details (getById API):</h3>
        <DoctorDetails doctorId={selectedDoctorId} />
      </div>

      {/* All Doctors List */}
      <div>
        <h3 className="text-lg font-semibold mb-4">All Doctors (getAll API):</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doctor) => (
            <div 
              key={doctor.id} 
              className="border border-gray-300 p-4 rounded-lg shadow hover:shadow-md transition-shadow"
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
  );
}
