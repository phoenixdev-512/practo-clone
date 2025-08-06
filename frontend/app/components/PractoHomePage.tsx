'use client';

import { useState, useEffect } from 'react';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  location: string;
  rating?: number;
  experience?: number;
  fees?: number;
}

export default function PractoHomePage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch doctors from API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/doctors');
        const data = await response.json();
        // Add some mock data for better presentation
        const enrichedDoctors = data.map((doctor: Doctor, index: number) => ({
          ...doctor,
          rating: 4.1 + (index * 0.2),
          experience: 5 + (index * 2),
          fees: 300 + (index * 50)
        }));
        setDoctors(enrichedDoctors);
        setFilteredDoctors(enrichedDoctors);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Filter doctors based on search and location
  useEffect(() => {
    let filtered = doctors;
    
    if (searchTerm) {
      filtered = filtered.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedLocation) {
      filtered = filtered.filter(doctor =>
        doctor.location.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }
    
    setFilteredDoctors(filtered);
  }, [searchTerm, selectedLocation, doctors]);

  const specialties = [
    { name: 'Dentist', icon: '🦷' },
    { name: 'Gynecologist/Obstetrician', icon: '👶' },
    { name: 'General physician', icon: '👨‍⚕️' },
    { name: 'Dermatologist', icon: '🧴' },
    { name: 'Ear-nose-throat (ent)', icon: '👂' },
    { name: 'Homeopath', icon: '🌿' },
    { name: 'Ayurveda', icon: '🍃' },
    { name: 'Cardiologist', icon: '❤️' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">Practo</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600">Find Doctors</a>
              <a href="#" className="text-gray-700 hover:text-blue-600">Video Consult</a>
              <a href="#" className="text-gray-700 hover:text-blue-600">Medicines</a>
              <a href="#" className="text-gray-700 hover:text-blue-600">Lab Tests</a>
              <a href="#" className="text-gray-700 hover:text-blue-600">Surgeries</a>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="text-gray-700 hover:text-blue-600">Login / Signup</button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Skip the travel! Find Online</h2>
            <h3 className="text-3xl font-semibold mb-8">Medical Centers</h3>
            <p className="text-xl mb-8">Connect instantly with a 24x7 specialist or choose to video visit a particular doctor.</p>
            
            {/* Search Box */}
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <span className="absolute left-3 top-3 text-gray-400">🔍</span>
                  <input
                    type="text"
                    placeholder="Search doctors, clinics, hospitals, etc."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex-1 relative">
                  <span className="absolute left-3 top-3 text-gray-400">📍</span>
                  <input
                    type="text"
                    placeholder="Select Location"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Find by specialisation</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {specialties.map((specialty, index) => (
              <button
                key={index}
                onClick={() => setSearchTerm(specialty.name)}
                className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-center group"
              >
                <div className="text-3xl mb-2">{specialty.icon}</div>
                <div className="text-sm text-gray-700 group-hover:text-blue-600">{specialty.name}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors List */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900">
              {filteredDoctors.length} doctors available {selectedLocation && `in ${selectedLocation}`}
            </h3>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Sort by:</span>
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                <option>Relevance</option>
                <option>Experience</option>
                <option>Fees</option>
                <option>Rating</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading doctors...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredDoctors.map((doctor) => (
                <div key={doctor.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Doctor Avatar */}
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-2xl font-semibold text-blue-600">
                          {doctor.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    </div>

                    {/* Doctor Info */}
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:justify-between">
                        <div>
                          <h4 className="text-xl font-semibold text-gray-900 mb-1">{doctor.name}</h4>
                          <p className="text-blue-600 mb-2">{doctor.specialty}</p>
                          <p className="text-gray-600 mb-2">{doctor.experience} years experience</p>
                          <div className="flex items-center mb-2">
                            <span className="text-gray-400 mr-1">📍</span>
                            <span className="text-sm text-gray-600">{doctor.location}</span>
                          </div>
                          <div className="flex items-center">
                            <div className="flex items-center">
                              <span className="text-yellow-400 mr-1">⭐</span>
                              <span className="text-sm text-gray-600">{doctor.rating}</span>
                            </div>
                          </div>
                        </div>

                        {/* Booking Section */}
                        <div className="mt-4 md:mt-0 md:text-right">
                          <div className="mb-4">
                            <span className="text-2xl font-bold text-gray-900">₹{doctor.fees}</span>
                            <span className="text-sm text-gray-500 ml-1">Consultation fee</span>
                          </div>
                          <div className="space-y-2">
                            <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                              Book Appointment
                            </button>
                            <button className="w-full md:w-auto border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-lg font-semibold transition-colors">
                              Video Consult
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && filteredDoctors.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No doctors found matching your criteria.</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedLocation('');
                }}
                className="mt-4 text-blue-600 hover:text-blue-700 font-semibold"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h5 className="text-lg font-semibold mb-4">Practo</h5>
              <p className="text-gray-400">Making healthcare accessible to everyone, everywhere.</p>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">For Patients</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Search for doctors</li>
                <li>Search for clinics</li>
                <li>Search for hospitals</li>
                <li>Book health checkup</li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">For Doctors</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Practo Profile</li>
                <li>For Clinics</li>
                <li>Ray by Practo</li>
                <li>Practo Reach</li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">More</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Help</li>
                <li>Developers</li>
                <li>Privacy Policy</li>
                <li>Terms & Conditions</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Practo Clone. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
