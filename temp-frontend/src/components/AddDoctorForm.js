import React, { useState } from 'react';

const AddDoctorForm = ({ onDoctorAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    location: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('http://localhost:5000/api/doctors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add doctor');
      }

      const result = await response.json();
      console.log('Doctor added successfully:', result);
      
      // Reset form
      setFormData({ name: '', specialty: '', location: '' });
      setSuccess(true);
      
      // Notify parent component to refresh the list
      if (onDoctorAdded) {
        onDoctorAdded(result.doctor);
      }

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);

    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Add New Doctor (Mutation)</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Doctor Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="e.g., Dr. John Smith"
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Specialty *
          </label>
          <input
            type="text"
            name="specialty"
            value={formData.specialty}
            onChange={handleInputChange}
            placeholder="e.g., Cardiologist, Neurologist"
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Location *
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="e.g., Mumbai, Delhi"
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full px-4 py-2 rounded text-white font-medium transition-colors ${
            isSubmitting 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isSubmitting ? 'Adding Doctor...' : 'Add Doctor'}
        </button>
      </form>

      {/* Success Message */}
      {success && (
        <div className="mt-3 p-3 bg-green-100 border border-green-300 rounded text-green-700">
          ✅ Doctor added successfully!
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-3 p-3 bg-red-100 border border-red-300 rounded text-red-700">
          ❌ Error: {error}
        </div>
      )}

      {/* TRPC-Style Usage Example */}
      <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded text-sm">
        <h4 className="font-medium mb-1">TRPC-Style Usage:</h4>
        <code className="text-xs text-gray-600">
          trpc.doctors.addDoctor.useMutation()
        </code>
      </div>
    </div>
  );
};

export default AddDoctorForm;
