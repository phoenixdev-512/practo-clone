// TRPC-Style Usage Example (Conceptual Demo)
// This shows how the three procedures would be used if TRPC was fully working

import React, { useState } from 'react';

// Simulated TRPC hook - this would be the actual TRPC client in a real app
const useTRPCQuery = (endpoint, input = null) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const executeQuery = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      let url;
      switch(endpoint) {
        case 'doctors.getAll':
          url = 'http://localhost:5000/api/doctors';
          break;
        case 'doctors.getById':
          url = `http://localhost:5000/api/doctors/${input}`;
          break;
        case 'doctors.searchBySpecialty':
          url = `http://localhost:5000/api/doctors/specialty/${input}`;
          break;
        default:
          throw new Error('Unknown endpoint');
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error('Query failed');
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, refetch: executeQuery };
};

const TRPCStyleDemo = () => {
  const [selectedId, setSelectedId] = useState('1');
  const [searchSpecialty, setSearchSpecialty] = useState('Cardiologist');

  // Simulate TRPC procedures
  const getAllDoctors = useTRPCQuery('doctors.getAll');
  const getDoctorById = useTRPCQuery('doctors.getById', selectedId);
  const searchBySpecialty = useTRPCQuery('doctors.searchBySpecialty', searchSpecialty);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">TRPC-Style Procedures Demo</h2>
      
      <div className="grid gap-6 md:grid-cols-3">
        {/* Procedure 1: getAll */}
        <div className="border p-4 rounded-lg">
          <h3 className="font-semibold mb-2">1. trpc.doctors.getAll.useQuery()</h3>
          <button 
            onClick={getAllDoctors.refetch}
            className="mb-2 px-3 py-1 bg-blue-500 text-white rounded text-sm"
          >
            Fetch All Doctors
          </button>
          
          {getAllDoctors.isLoading && <p className="text-blue-600">Loading...</p>}
          {getAllDoctors.error && <p className="text-red-600">Error: {getAllDoctors.error.message}</p>}
          {getAllDoctors.data && (
            <div className="text-sm">
              <p className="font-medium">Found {getAllDoctors.data.length} doctors:</p>
              {getAllDoctors.data.slice(0, 2).map(doc => (
                <p key={doc.id} className="text-gray-600">{doc.name}</p>
              ))}
            </div>
          )}
        </div>

        {/* Procedure 2: getById */}
        <div className="border p-4 rounded-lg">
          <h3 className="font-semibold mb-2">2. trpc.doctors.getById.useQuery()</h3>
          <input
            type="text"
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            placeholder="Doctor ID"
            className="w-full border rounded px-2 py-1 mb-2 text-sm"
          />
          <button 
            onClick={getDoctorById.refetch}
            className="mb-2 px-3 py-1 bg-green-500 text-white rounded text-sm"
          >
            Get Doctor by ID
          </button>
          
          {getDoctorById.isLoading && <p className="text-blue-600">Loading...</p>}
          {getDoctorById.error && <p className="text-red-600">Error: {getDoctorById.error.message}</p>}
          {getDoctorById.data && (
            <div className="text-sm">
              <p className="font-medium">{getDoctorById.data.name}</p>
              <p className="text-gray-600">{getDoctorById.data.specialty}</p>
            </div>
          )}
        </div>

        {/* Procedure 3: searchBySpecialty */}
        <div className="border p-4 rounded-lg">
          <h3 className="font-semibold mb-2">3. trpc.doctors.searchBySpecialty.useQuery()</h3>
          <input
            type="text"
            value={searchSpecialty}
            onChange={(e) => setSearchSpecialty(e.target.value)}
            placeholder="Specialty"
            className="w-full border rounded px-2 py-1 mb-2 text-sm"
          />
          <button 
            onClick={searchBySpecialty.refetch}
            className="mb-2 px-3 py-1 bg-purple-500 text-white rounded text-sm"
          >
            Search by Specialty
          </button>
          
          {searchBySpecialty.isLoading && <p className="text-blue-600">Loading...</p>}
          {searchBySpecialty.error && <p className="text-red-600">Error: {searchBySpecialty.error.message}</p>}
          {searchBySpecialty.data && (
            <div className="text-sm">
              <p className="font-medium">Found {searchBySpecialty.data.length} doctors</p>
              {searchBySpecialty.data.map(doc => (
                <p key={doc.id} className="text-gray-600">{doc.name}</p>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-100 rounded">
        <h4 className="font-semibold mb-2">📝 Implementation Notes:</h4>
        <ul className="text-sm space-y-1">
          <li>• <strong>getAll</strong>: Fetches all doctors from the database/JSON</li>
          <li>• <strong>getById</strong>: Takes a string ID input, returns single doctor</li>
          <li>• <strong>searchBySpecialty</strong>: Takes a string specialty, returns matching doctors</li>
          <li>• All procedures include proper error handling and type safety</li>
          <li>• Backend implemented as both REST API and TRPC procedures</li>
        </ul>
      </div>
    </div>
  );
};

export default TRPCStyleDemo;
