import React, { useState, useEffect } from 'react';

const DoctorDetails = ({ doctorId }) => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!doctorId) return;

    const fetchDoctor = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:5000/api/doctors/${doctorId}`);
        if (!response.ok) {
          throw new Error(`Doctor with ID ${doctorId} not found`);
        }
        const data = await response.json();
        setDoctor(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [doctorId]);

  if (loading) return <div className="p-4 text-blue-600">Loading doctor details...</div>;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;
  if (!doctor) return <div className="p-4 text-gray-600">No doctor selected</div>;

  return (
    <div className="p-4 bg-white border border-gray-300 rounded-lg shadow">
      <h3 className="text-xl font-bold mb-2">Doctor Details</h3>
      <div className="space-y-2">
        <p><strong>ID:</strong> {doctor.id}</p>
        <p><strong>Name:</strong> {doctor.name}</p>
        <p><strong>Specialty:</strong> {doctor.specialty}</p>
        <p><strong>Location:</strong> {doctor.location}</p>
      </div>
    </div>
  );
};

export default DoctorDetails;
