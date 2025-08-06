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
}

export default function PractoHomePage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('Bangalore');
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
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const popularSearches = [
    'Dermatologist', 'Pediatrician', 'Gynecologist', 'ENT', 'Cardiologist', 
    'Dentist', 'Orthopedic', 'Neurologist', 'Psychiatrist', 'General Physician'
  ];

  const quickActions = [
    { icon: '📞', title: 'Consult with a doctor', subtitle: 'Video/Audio call' },
    { icon: '💊', title: 'Order Medicines', subtitle: 'Medicine delivery' },
    { icon: '📄', title: 'View Medical Records', subtitle: 'Medical history' },
    { icon: '🧪', title: 'Book Test', subtitle: 'Lab tests at home' },
    { icon: '📚', title: 'Read Articles', subtitle: 'Health tips' },
    { icon: '🩺', title: 'For Healthcare Providers', subtitle: 'Practo for doctors' }
  ];

  const specialties = [
    { name: 'Dentist', icon: '🦷', subtitle: 'Teething troubles? Schedule a dental checkup' },
    { name: 'Gynecologist/Obstetrician', icon: '👶', subtitle: 'Consult with top gynecologists' },
    { name: 'Dermatologist', icon: '🧴', subtitle: 'For all your skin, hair and nail concerns' },
    { name: 'General physician', icon: '👨‍⚕️', subtitle: 'For routine check-ups and minor illnesses' },
    { name: 'Ear-nose-throat (ent)', icon: '👂', subtitle: 'Comprehensive ENT care' },
    { name: 'Homeopath', icon: '🌿', subtitle: 'Natural healing approach' },
    { name: 'Ayurveda', icon: '🍃', subtitle: 'Traditional medicine system' },
    { name: 'Cardiologist', icon: '❤️', subtitle: 'Heart health specialists' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navbar */}
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
              <div className="hidden md:flex items-center space-x-4">
                <div className="relative group">
                  <button className="text-gray-700 hover:text-blue-600 font-medium flex items-center">
                    For Corporates
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
                <div className="relative group">
                  <button className="text-gray-700 hover:text-blue-600 font-medium flex items-center">
                    For Providers
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
                <div className="relative group">
                  <button className="text-gray-700 hover:text-blue-600 font-medium flex items-center">
                    Security & help
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>
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

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1d4ed8] to-[#2563eb] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Your home</h1>
            <h2 className="text-5xl font-bold mb-8">for health</h2>
            <p className="text-2xl font-semibold mb-12">Find and Book</p>
            
            {/* Dual Search Box */}
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-2">
              <div className="flex flex-col md:flex-row">
                <div className="flex-1 relative">
                  <div className="flex items-center px-4 py-4 border-r md:border-r-gray-200">
                    <span className="text-gray-400 mr-3">📍</span>
                    <input
                      type="text"
                      placeholder="Bangalore"
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full text-gray-900 placeholder-gray-500 focus:outline-none text-lg"
                    />
                  </div>
                </div>
                <div className="flex-1 relative">
                  <div className="flex items-center px-4 py-4">
                    <span className="text-gray-400 mr-3">🔍</span>
                    <input
                      type="text"
                      placeholder="Search doctors, clinics, hospitals, etc."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full text-gray-900 placeholder-gray-500 focus:outline-none text-lg"
                    />
                  </div>
                </div>
                <Link 
                  href="/doctor-listing"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 m-1 rounded-lg font-semibold transition-colors text-lg"
                >
                  Search
                </Link>
              </div>
            </div>

            {/* Popular Searches */}
            <div className="mt-8">
              <p className="text-lg mb-4 opacity-90">Popular searches:</p>
              <div className="flex flex-wrap justify-center gap-3">
                {popularSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchTerm(search)}
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-full text-sm font-medium transition-all"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center group"
              >
                <div className="text-3xl mb-3">{action.icon}</div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-blue-600">
                  {action.title}
                </h3>
                <p className="text-xs text-gray-500">{action.subtitle}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Book an appointment section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Book an appointment for an in-clinic consultation
            </h2>
            <p className="text-xl text-gray-600">
              Find experienced doctors across all specialties
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialties.map((specialty, index) => (
              <Link
                key={index}
                href="/doctor-listing"
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow group"
              >
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-4">{specialty.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                    {specialty.name}
                  </h3>
                </div>
                <p className="text-sm text-gray-600">{specialty.subtitle}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Consult top doctors online section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Consult top doctors online for any health concern
            </h2>
            <p className="text-xl text-gray-600">
              Private online consultations with verified doctors in all specialists
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.slice(0, 6).map((doctor) => (
              <div key={doctor.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-xl font-semibold text-blue-600">
                      {doctor.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                    <p className="text-blue-600">{doctor.specialty}</p>
                    <p className="text-sm text-gray-500">{doctor.experience} years experience</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">₹{doctor.fees}</span>
                    <span className="text-sm text-gray-500 ml-1">onwards</span>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Consult Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link 
              href="/doctor-listing"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              View All Doctors
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
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
