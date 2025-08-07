'use client';

import { useState, useEffect } from 'react';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  location: string;
}

export default function AdminPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    specialty: '',
    location: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/doctors');
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/doctors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDoctor),
      });

      if (response.ok) {
        setNewDoctor({ name: '', specialty: '', location: '' });
        fetchDoctors(); // Refresh the list
        alert('Doctor added successfully!');
      } else {
        alert('Failed to add doctor');
      }
    } catch (error) {
      console.error('Error adding doctor:', error);
      alert('Error adding doctor');
    } finally {
      setIsSubmitting(false);
    }
  };

  const testEndpoint = async (endpoint: string, description: string) => {
    try {
      const response = await fetch(`http://localhost:5000${endpoint}`);
      const data = await response.json();
      alert(`${description}:\n${JSON.stringify(data, null, 2)}`);
    } catch (error) {
      alert(`Error testing ${description}: ${error}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href="/" className="text-2xl font-bold text-blue-600 mr-8">Practo</a>
              <h1 className="text-xl font-semibold text-gray-900">Admin Panel</h1>
            </div>
            <a href="/" className="text-blue-600 hover:text-blue-700">← Back to homepage</a>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Add Doctor Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Add New Doctor</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Doctor Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newDoctor.name}
                    onChange={(e) => setNewDoctor({...newDoctor, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Dr. John Doe"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specialty
                  </label>
                  <select
                    required
                    value={newDoctor.specialty}
                    onChange={(e) => setNewDoctor({...newDoctor, specialty: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Specialty</option>
                    <option value="Cardiologist">Cardiologist</option>
                    <option value="Dermatologist">Dermatologist</option>
                    <option value="Pediatrician">Pediatrician</option>
                    <option value="Gynecologist">Gynecologist</option>
                    <option value="Orthopedic">Orthopedic</option>
                    <option value="Psychiatrist">Psychiatrist</option>
                    <option value="ENT Specialist">ENT Specialist</option>
                    <option value="Neurologist">Neurologist</option>
                    <option value="General Physician">General Physician</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <select
                    required
                    value={newDoctor.location}
                    onChange={(e) => setNewDoctor({...newDoctor, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Location</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Pune">Pune</option>
                    <option value="Kolkata">Kolkata</option>
                    <option value="Ahmedabad">Ahmedabad</option>
                  </select>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white py-2 rounded-lg font-semibold transition-colors"
                >
                  {isSubmitting ? 'Adding...' : 'Add Doctor'}
                </button>
              </form>
            </div>

            {/* API Testing */}
            <div className="bg-white rounded-lg shadow p-6 mt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Test API Endpoints</h2>
              <div className="space-y-2">
                <button 
                  onClick={() => testEndpoint('/api/doctors', 'Get All Doctors')}
                  className="w-full text-left px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm"
                >
                  🔍 GET /api/doctors
                </button>
                <button 
                  onClick={() => testEndpoint('/api/doctors/1', 'Get Doctor by ID')}
                  className="w-full text-left px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm"
                >
                  👤 GET /api/doctors/1
                </button>
                <button 
                  onClick={() => testEndpoint('/api/doctors/specialty/Cardiologist', 'Search by Specialty')}
                  className="w-full text-left px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm"
                >
                  🏥 GET /api/doctors/specialty/Cardiologist
                </button>
                <button 
                  onClick={() => testEndpoint('/api/doctors/city/Delhi', 'Search by City')}
                  className="w-full text-left px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm"
                >
                  📍 GET /api/doctors/city/Delhi
                </button>
              </div>
            </div>
          </div>

          {/* Doctors List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">All Doctors ({doctors.length})</h2>
              </div>
              
              {loading ? (
                <div className="p-6 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Loading doctors...</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {doctors.map((doctor) => (
                    <div key={doctor.id} className="p-6 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="font-semibold text-blue-600">
                              {doctor.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                            <p className="text-blue-600">{doctor.specialty}</p>
                            <p className="text-sm text-gray-500">📍 {doctor.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">ID: {doctor.id}</span>
                          <a 
                            href={`/doctor/${doctor.id}`}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors"
                          >
                            View Profile
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* API Documentation */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">🚀 API Endpoints Documentation</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Query Endpoints</h3>
              <div className="space-y-2 text-sm">
                <div className="p-3 bg-green-50 rounded border-l-4 border-green-400">
                  <strong>GET /api/doctors</strong><br />
                  <span className="text-gray-600">Fetch all doctors (getAll procedure)</span>
                </div>
                <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-400">
                  <strong>GET /api/doctors/:id</strong><br />
                  <span className="text-gray-600">Fetch doctor by ID (getById procedure)</span>
                </div>
                <div className="p-3 bg-purple-50 rounded border-l-4 border-purple-400">
                  <strong>GET /api/doctors/specialty/:specialty</strong><br />
                  <span className="text-gray-600">Search by specialty (searchBySpecialty procedure)</span>
                </div>
                <div className="p-3 bg-orange-50 rounded border-l-4 border-orange-400">
                  <strong>GET /api/doctors/city/:city</strong><br />
                  <span className="text-gray-600">Search by city (getDoctorsByCity procedure)</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Mutation Endpoints</h3>
              <div className="space-y-2 text-sm">
                <div className="p-3 bg-yellow-50 rounded border-l-4 border-yellow-400">
                  <strong>POST /api/doctors</strong><br />
                  <span className="text-gray-600">Add new doctor (addDoctor procedure)</span><br />
                  <span className="text-xs text-gray-500">Body: {`{ "name": "Dr. Name", "specialty": "...", "location": "..." }`}</span>
                </div>
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-3 mt-6">Statistics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded">
                  <div className="text-2xl font-bold text-blue-600">{doctors.length}</div>
                  <div className="text-sm text-gray-600">Total Doctors</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded">
                  <div className="text-2xl font-bold text-green-600">
                    {new Set(doctors.map(d => d.specialty)).size}
                  </div>
                  <div className="text-sm text-gray-600">Specialties</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
