// TRPC Mutation Usage Demo
// This shows how the addDoctor mutation would be used if TRPC was fully working

import React, { useState } from 'react';

const TRPCMutationDemo = () => {
  const [formData, setFormData] = useState({
    name: 'Dr. Sarah Wilson',
    specialty: 'Oncologist',
    location: 'Kolkata'
  });

  // Simulated TRPC mutation hook
  const useTRPCMutation = (endpoint) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const mutate = async (input) => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch('http://localhost:5000/api/doctors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(input),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error);
        }

        const result = await response.json();
        setData(result);
        return result;
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    };

    return { mutate, isLoading, error, data };
  };

  // Simulated TRPC utils for cache invalidation
  const utils = {
    doctors: {
      getAll: {
        invalidate: () => {
          console.log('🔄 Invalidating getAll cache - would refetch all doctors');
        }
      }
    }
  };

  const addDoctor = useTRPCMutation('doctors.addDoctor');

  const handleMutationDemo = async () => {
    try {
      const result = await addDoctor.mutate(formData);
      console.log('✅ Mutation successful:', result);
      
      // Invalidate cache to refetch data
      utils.doctors.getAll.invalidate();
      
      // Reset form or update UI
      console.log('🔄 Refreshing doctor list...');
    } catch (error) {
      console.error('❌ Mutation failed:', error.message);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white border border-gray-200 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">TRPC Mutation Demo</h3>
      
      <div className="space-y-3 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">Doctor Name:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Specialty:</label>
          <input
            type="text"
            value={formData.specialty}
            onChange={(e) => setFormData({...formData, specialty: e.target.value})}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Location:</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          />
        </div>
      </div>

      <button
        onClick={handleMutationDemo}
        disabled={addDoctor.isLoading}
        className={`w-full px-4 py-2 rounded text-white font-medium transition-colors ${
          addDoctor.isLoading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-purple-500 hover:bg-purple-600'
        }`}
      >
        {addDoctor.isLoading ? 'Adding...' : 'Run TRPC Mutation'}
      </button>

      {addDoctor.error && (
        <div className="mt-3 p-2 bg-red-100 border border-red-300 rounded text-red-700 text-sm">
          Error: {addDoctor.error.message}
        </div>
      )}

      {addDoctor.data && (
        <div className="mt-3 p-2 bg-green-100 border border-green-300 rounded text-green-700 text-sm">
          ✅ Added: {addDoctor.data.doctor.name}
        </div>
      )}

      <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded text-xs">
        <h4 className="font-medium mb-1">TRPC Code Pattern:</h4>
        <code className="block text-gray-600">
          {`const addDoctor = trpc.doctors.addDoctor.useMutation({
  onSuccess: () => {
    utils.doctors.getAll.invalidate();
  }
});

addDoctor.mutate({ name, specialty, location });`}
        </code>
      </div>
    </div>
  );
};

export default TRPCMutationDemo;
