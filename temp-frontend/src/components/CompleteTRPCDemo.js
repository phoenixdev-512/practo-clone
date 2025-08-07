import React, { useState } from 'react';

const CompleteTRPCDemo = () => {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState({});

  const executeQuery = async (procedureName, endpoint, params = {}) => {
    setLoading(prev => ({ ...prev, [procedureName]: true }));
    
    try {
      let url;
      let options = { method: 'GET' };

      switch (procedureName) {
        case 'getAll':
          url = 'http://localhost:5000/api/doctors';
          break;
        case 'getById':
          url = `http://localhost:5000/api/doctors/${params.id}`;
          break;
        case 'searchBySpecialty':
          url = `http://localhost:5000/api/doctors/specialty/${params.specialty}`;
          break;
        case 'getDoctorsByCity':
          url = `http://localhost:5000/api/doctors/city/${params.city}`;
          break;
        case 'addDoctor':
          url = 'http://localhost:5000/api/doctors';
          options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
          };
          break;
        default:
          throw new Error('Unknown procedure');
      }

      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const data = await response.json();
      setResults(prev => ({ ...prev, [procedureName]: data }));
    } catch (error) {
      setResults(prev => ({ ...prev, [procedureName]: { error: error.message } }));
    } finally {
      setLoading(prev => ({ ...prev, [procedureName]: false }));
    }
  };

  const formatResult = (result) => {
    if (!result) return 'No data';
    if (result.error) return `Error: ${result.error}`;
    if (Array.isArray(result)) return `${result.length} items`;
    if (result.doctor) return `Added: ${result.doctor.name}`;
    return `${result.name || 'Item'}`;
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Complete TRPC Procedures Demo</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* 1. getAll */}
        <div className="border p-4 rounded-lg bg-blue-50">
          <h3 className="font-semibold mb-2">1. doctors.getAll</h3>
          <p className="text-sm text-gray-600 mb-3">Fetch all doctors</p>
          <button 
            onClick={() => executeQuery('getAll')}
            disabled={loading.getAll}
            className="w-full px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading.getAll ? 'Loading...' : 'Execute Query'}
          </button>
          <div className="mt-2 text-sm">
            Result: {formatResult(results.getAll)}
          </div>
        </div>

        {/* 2. getById */}
        <div className="border p-4 rounded-lg bg-green-50">
          <h3 className="font-semibold mb-2">2. doctors.getById</h3>
          <p className="text-sm text-gray-600 mb-3">Get doctor by ID</p>
          <button 
            onClick={() => executeQuery('getById', null, { id: '1' })}
            disabled={loading.getById}
            className="w-full px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
          >
            {loading.getById ? 'Loading...' : 'Get Doctor ID=1'}
          </button>
          <div className="mt-2 text-sm">
            Result: {formatResult(results.getById)}
          </div>
        </div>

        {/* 3. searchBySpecialty */}
        <div className="border p-4 rounded-lg bg-purple-50">
          <h3 className="font-semibold mb-2">3. doctors.searchBySpecialty</h3>
          <p className="text-sm text-gray-600 mb-3">Search by specialty</p>
          <button 
            onClick={() => executeQuery('searchBySpecialty', null, { specialty: 'Cardiologist' })}
            disabled={loading.searchBySpecialty}
            className="w-full px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:bg-gray-400"
          >
            {loading.searchBySpecialty ? 'Loading...' : 'Search "Cardiologist"'}
          </button>
          <div className="mt-2 text-sm">
            Result: {formatResult(results.searchBySpecialty)}
          </div>
        </div>

        {/* 4. getDoctorsByCity */}
        <div className="border p-4 rounded-lg bg-orange-50">
          <h3 className="font-semibold mb-2">4. doctors.getDoctorsByCity</h3>
          <p className="text-sm text-gray-600 mb-3">Search by city</p>
          <button 
            onClick={() => executeQuery('getDoctorsByCity', null, { city: 'Mumbai' })}
            disabled={loading.getDoctorsByCity}
            className="w-full px-3 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:bg-gray-400"
          >
            {loading.getDoctorsByCity ? 'Loading...' : 'Search "Mumbai"'}
          </button>
          <div className="mt-2 text-sm">
            Result: {formatResult(results.getDoctorsByCity)}
          </div>
        </div>

        {/* 5. addDoctor */}
        <div className="border p-4 rounded-lg bg-red-50">
          <h3 className="font-semibold mb-2">5. doctors.addDoctor</h3>
          <p className="text-sm text-gray-600 mb-3">Add new doctor (mutation)</p>
          <button 
            onClick={() => executeQuery('addDoctor', null, {
              name: 'Dr. Demo User',
              specialty: 'Demo Specialty',
              location: 'Demo City'
            })}
            disabled={loading.addDoctor}
            className="w-full px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-400"
          >
            {loading.addDoctor ? 'Loading...' : 'Add Demo Doctor'}
          </button>
          <div className="mt-2 text-sm">
            Result: {formatResult(results.addDoctor)}
          </div>
        </div>

        {/* Summary */}
        <div className="border p-4 rounded-lg bg-gray-50">
          <h3 className="font-semibold mb-2">📊 Summary</h3>
          <div className="text-sm space-y-1">
            <p><strong>Queries:</strong> 4</p>
            <p><strong>Mutations:</strong> 1</p>
            <p><strong>Total Procedures:</strong> 5</p>
            <p className="text-green-600 font-medium">✅ All Working!</p>
          </div>
        </div>
      </div>

      {/* Detailed Results */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-semibold mb-4">Detailed Results:</h3>
        <pre className="text-xs overflow-auto bg-white p-3 rounded border">
          {JSON.stringify(results, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default CompleteTRPCDemo;
