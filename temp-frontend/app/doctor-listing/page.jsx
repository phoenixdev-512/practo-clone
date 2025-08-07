'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  location: string;
  rating?: number;
  experience?: number;
  fees?: number;
  patientStories?: number;
  availability?: string;
}

export default function DoctorListingPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('JP Nagar, Bangalore');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [sortBy, setSortBy] = useState('Relevance');
  const [loading, setLoading] = useState(true);

  // Fetch doctors from API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/doctors');
        const data = await response.json();
        // Add enriched data for better presentation
        const enrichedDoctors = data.map((doctor: any, index: number) => ({
          ...doctor,
          rating: 4.1 + (index * 0.2),
          experience: 5 + (index * 2),
          fees: 800 + (index * 100),
          patientStories: 50 + (index * 10),
          availability: index % 2 === 0 ? 'Available Today' : 'Available Tomorrow'
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

  // Filter and sort doctors
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

    // Sort functionality
    switch (sortBy) {
      case 'Experience':
        filtered.sort((a, b) => (b.experience || 0) - (a.experience || 0));
        break;
      case 'Rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'Fees':
        filtered.sort((a, b) => (a.fees || 0) - (b.fees || 0));
        break;
      default:
        // Relevance - keep original order
        break;
    }
    
    setFilteredDoctors(filtered);
  }, [searchTerm, selectedLocation, selectedGender, selectedExperience, sortBy, doctors]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                practo
              </Link>
              <nav className="hidden lg:flex space-x-8">
                <Link href="/doctor-listing" className="text-gray-700 hover:text-blue-600 font-medium">
                  Find Doctors
                </Link>
                <Link href="#" className="text-gray-700 hover:text-blue-600 font-medium">
                  Video Consult
                </Link>
                <Link href="#" className="text-gray-700 hover:text-blue-600 font-medium">
                  Surgeries
                </Link>
              </nav>
            </div>
            
            <div className="flex items-center space-x-6">
              <Link href="/admin" className="text-blue-600 hover:text-blue-700 font-medium">
                Admin
              </Link>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Login / Signup
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <section className="bg-white py-6 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Search Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3">
                  <span className="text-gray-400 mr-3">📍</span>
                  <input
                    type="text"
                    placeholder="JP Nagar, Bangalore"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full text-gray-900 placeholder-gray-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex-1 relative">
                <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3">
                  <span className="text-gray-400 mr-3">🔍</span>
                  <input
                    type="text"
                    placeholder="Search doctors, specialities..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full text-gray-900 placeholder-gray-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Search
            </button>
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap gap-4 items-center">
            <select 
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            
            <select 
              value={selectedExperience}
              onChange={(e) => setSelectedExperience(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Experience</option>
              <option value="5+">5+ years</option>
              <option value="10+">10+ years</option>
              <option value="15+">15+ years</option>
            </select>
            
            <button className="border border-gray-300 rounded-lg px-4 py-2 text-sm hover:bg-gray-50">
              Patient Stories
            </button>
            
            <button className="border border-gray-300 rounded-lg px-4 py-2 text-sm hover:bg-gray-50">
              All Filters
            </button>
            
            <div className="ml-auto flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Relevance</option>
                <option>Experience</option>
                <option>Rating</option>
                <option>Fees</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {filteredDoctors.length} Dermatologists available in {selectedLocation}
            </h1>
            <p className="text-gray-600">
              Book appointments with minimum wait-time & verified doctor details
            </p>
          </div>

          {/* Doctor Cards */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading doctors...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredDoctors.map((doctor: any) => (
                <div key={doctor.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Left: Doctor Image/Avatar */}
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-2xl font-semibold text-blue-600">
                            {doctor.name.split(' ').map((n: string) => n[0]).join('')}
                          </span>
                        </div>
                      </div>

                      {/* Middle: Doctor Info */}
                      <div className="flex-1">
                        <div className="mb-3">
                          <h3 className="text-xl font-semibold text-blue-600 hover:text-blue-700 cursor-pointer mb-1">
                            {doctor.name}
                          </h3>
                          <p className="text-gray-700 mb-1">
                            {doctor.specialty} • {doctor.experience} years experience
                          </p>
                          <p className="text-gray-600 text-sm mb-2">
                            📍 {doctor.location}
                          </p>
                        </div>

                        <div className="flex items-center space-x-4 mb-3">
                          <div className="flex items-center">
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                              ✅ {Math.round(doctor.rating * 20)}%
                            </span>
                          </div>
                          <span className="text-sm text-gray-600">
                            {doctor.patientStories} Patient Stories
                          </span>
                        </div>

                        <div className="text-lg font-bold text-gray-900 mb-2">
                          ₹{doctor.fees} Consultation fee at clinic
                        </div>

                        <div className="flex items-center text-sm text-gray-600">
                          <span className="text-green-600 mr-2">🟢</span>
                          {doctor.availability}
                        </div>
                      </div>

                      {/* Right: Action Buttons */}
                      <div className="flex-shrink-0 lg:w-48">
                        <div className="space-y-3">
                          <Link
                            href={`/doctor/${doctor.id}`}
                            className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center"
                          >
                            Book Clinic Visit
                          </Link>
                          <button className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition-colors">
                            Video Consult
                          </button>
                          <button className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-lg transition-colors text-sm">
                            Contact Clinic
                          </button>
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
              <p className="text-gray-600 mb-4">No doctors found matching your criteria.</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedLocation('');
                  setSelectedGender('');
                  setSelectedExperience('');
                }}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-blue-400">Practo</h3>
              <p className="text-gray-400 text-sm">
                Making healthcare accessible to everyone, everywhere.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">For patients</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">Search for doctors</a></li>
                <li><a href="#" className="hover:text-white">Search for clinics</a></li>
                <li><a href="#" className="hover:text-white">Search for hospitals</a></li>
                <li><a href="#" className="hover:text-white">Book health checkup</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">For doctors</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">Practo Profile</a></li>
                <li><a href="#" className="hover:text-white">For Clinics</a></li>
                <li><a href="#" className="hover:text-white">Ray by Practo</a></li>
                <li><a href="#" className="hover:text-white">Practo Reach</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">More</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">Help</a></li>
                <li><a href="#" className="hover:text-white">Developers</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Social</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">Facebook</a></li>
                <li><a href="#" className="hover:text-white">Twitter</a></li>
                <li><a href="#" className="hover:text-white">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white">YouTube</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 Practo Clone. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
