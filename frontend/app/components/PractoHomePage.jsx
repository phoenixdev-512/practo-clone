'use client';

import { useState } from 'react';
import Link from 'next/link';
import { trpc } from '../../src/utils/trpc';

export default function PractoHomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('Bangalore');

  // Use TRPC to fetch doctors
  const { data: doctors = [], isLoading } = trpc.doctors.getAll.useQuery();

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
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-2xl font-bold text-practoBlue">
                practo
              </Link>
              <nav className="hidden lg:flex space-x-8">
                <Link href="/doctor-listing" className="text-gray-700 hover:text-practoBlue font-medium transition-colors">
                  Find Doctors
                </Link>
                <Link href="#" className="text-gray-700 hover:text-practoBlue font-medium transition-colors">
                  Video Consult
                </Link>
                <Link href="#" className="text-gray-700 hover:text-practoBlue font-medium transition-colors">
                  Surgeries
                </Link>
              </nav>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex items-center space-x-4">
                <div className="relative group">
                  <button className="text-gray-700 hover:text-practoBlue font-medium flex items-center transition-colors">
                    For Corporates
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
                <div className="relative group">
                  <button className="text-gray-700 hover:text-practoBlue font-medium flex items-center transition-colors">
                    For Providers
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>
              <Link href="/admin" className="text-practoBlue hover:text-blue-700 font-medium transition-colors">
                Admin
              </Link>
              <button className="bg-practoBlue hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Login / Signup
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-practoBlue to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Your home</h1>
            <h2 className="text-5xl md:text-6xl font-bold mb-8">for health</h2>
            <p className="text-2xl font-semibold mb-12 opacity-90">Find and Book</p>
            
            {/* Dual Search Box */}
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-2">
              <div className="flex flex-col md:flex-row">
                <div className="flex-1 relative">
                  <div className="flex items-center px-6 py-5 border-r md:border-r-gray-200">
                    <span className="text-gray-400 mr-3 text-xl">📍</span>
                    <input
                      type="text"
                      placeholder="Bangalore"
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full text-gray-900 placeholder-gray-500 focus:outline-none text-lg font-medium"
                    />
                  </div>
                </div>
                <div className="flex-1 relative">
                  <div className="flex items-center px-6 py-5">
                    <span className="text-gray-400 mr-3 text-xl">🔍</span>
                    <input
                      type="text"
                      placeholder="Search doctors, clinics, hospitals, etc."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full text-gray-900 placeholder-gray-500 focus:outline-none text-lg font-medium"
                    />
                  </div>
                </div>
                <Link 
                  href="/doctor-listing"
                  className="bg-practoBlue hover:bg-blue-700 text-white px-8 py-5 m-1 rounded-lg font-semibold transition-colors text-lg"
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
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-full text-sm font-medium transition-all backdrop-blur-sm"
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
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 text-center group border border-gray-100 hover:border-practoBlue/20"
              >
                <div className="text-4xl mb-4">{action.icon}</div>
                <h3 className="font-semibold text-gray-900 text-sm mb-2 group-hover:text-practoBlue transition-colors">
                  {action.title}
                </h3>
                <p className="text-xs text-gray-500">{action.subtitle}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Book an appointment section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Book an appointment for an in-clinic consultation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find experienced doctors across all specialties
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {specialties.map((specialty, index) => (
              <Link
                key={index}
                href="/doctor-listing"
                className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-all duration-300 group hover:border-practoBlue/30"
              >
                <div className="flex items-center mb-6">
                  <div className="text-4xl mr-4">{specialty.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-practoBlue transition-colors">
                    {specialty.name}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{specialty.subtitle}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Consult top doctors online section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Consult top doctors online for any health concern
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Private online consultations with verified doctors in all specialists
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              // Loading skeleton
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-8 animate-pulse border border-gray-100">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gray-200 rounded-full mr-4"></div>
                    <div>
                      <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-24 mb-1"></div>
                      <div className="h-3 bg-gray-200 rounded w-28"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                    <div className="h-8 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
              ))
            ) : (
              doctors.slice(0, 6).map((doctor, index) => (
                <div key={doctor.id} className="bg-white rounded-xl shadow-sm p-8 hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-practoBlue/20">
                  <div className="flex items-center mb-6">
                    <div className="w-20 h-20 bg-lightBlue rounded-full flex items-center justify-center mr-6">
                      <span className="text-xl font-bold text-practoBlue">
                        {doctor.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{doctor.name}</h3>
                      <p className="text-practoBlue font-medium">{doctor.specialty}</p>
                      <p className="text-sm text-gray-500">{5 + (index * 2)} years experience</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">₹{300 + (index * 50)}</span>
                      <span className="text-sm text-gray-500 ml-1">onwards</span>
                    </div>
                    <button className="bg-practoBlue hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                      Consult Now
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/doctor-listing"
              className="bg-practoBlue hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-semibold transition-colors text-lg"
            >
              View All Doctors
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-practoBlue">Practo</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Making healthcare accessible to everyone, everywhere.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6">For patients</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Search for doctors</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Search for clinics</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Search for hospitals</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Book health checkup</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6">For doctors</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Practo Profile</a></li>
                <li><a href="#" className="hover:text-white transition-colors">For Clinics</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Ray by Practo</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Practo Reach</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6">More</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Help</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Developers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6">Social</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition-colors">YouTube</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 Practo Clone. All rights reserved. Built with ❤️ using Next.js & Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
