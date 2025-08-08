'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { trpc } from '../../src/utils/trpc';

export default function PractoHomePage() {
  // Fix hydration error: floating dots state
  const [floatingDots, setFloatingDots] = useState([]);
  const [showFloatingDots, setShowFloatingDots] = useState(false);

  useEffect(() => {
    // Only run on client
    const dots = Array.from({ length: 20 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${3 + Math.random() * 4}s`,
    }));
    setFloatingDots(dots);
    setShowFloatingDots(true);
  }, []);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white animate-fade-in">
      {/* Top Navbar */}
      <header className="bg-white/95 backdrop-blur-md shadow-sm border-b sticky top-0 z-50 animate-slide-down">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-2xl font-bold text-practoBlue hover:scale-105 transition-transform duration-300 animate-pulse-gentle">
                practo
              </Link>
              <nav className="hidden lg:flex space-x-8">
                <Link href="/doctor-listing" className="text-gray-700 hover:text-practoBlue font-medium transition-all duration-300 hover:scale-105 relative group">
                  Find Doctors
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-practoBlue transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link href="#" className="text-gray-700 hover:text-practoBlue font-medium transition-all duration-300 hover:scale-105 relative group">
                  Video Consult
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-practoBlue transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link href="#" className="text-gray-700 hover:text-practoBlue font-medium transition-all duration-300 hover:scale-105 relative group">
                  Surgeries
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-practoBlue transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </nav>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex items-center space-x-4">
                <div className="relative group">
                  <button className="text-gray-700 hover:text-practoBlue font-medium flex items-center transition-all duration-300 hover:scale-105">
                    For Corporates
                    <svg className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
                <div className="relative group">
                  <button className="text-gray-700 hover:text-practoBlue font-medium flex items-center transition-all duration-300 hover:scale-105">
                    For Providers
                    <svg className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>
              <Link href="/admin" className="text-practoBlue hover:text-blue-700 font-medium transition-all duration-300 hover:scale-105">
                Admin
              </Link>
              <button className="bg-practoBlue hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 btn-animate hover-glow">
                Login / Signup
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="gradient-animate text-white py-24 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-bounce-gentle"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-white rounded-full float" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-32 w-12 h-12 bg-white rounded-full animate-pulse-gentle" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-6xl md:text-7xl font-bold mb-4 animate-slide-up">Your home</h1>
            <h2 className="text-6xl md:text-7xl font-bold mb-8 animate-slide-up" style={{animationDelay: '0.2s'}}>for health</h2>
            <p className="text-2xl font-semibold mb-16 opacity-90 animate-slide-up" style={{animationDelay: '0.4s'}}>Find and Book</p>
            
            {/* Enhanced Search Box */}
            <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-3 hover-glow animate-scale-in" style={{animationDelay: '0.6s'}}>
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 relative group">
                  <div className="flex items-center px-6 py-6 border-r md:border-r-gray-200">
                    <span className="text-gray-400 mr-3 text-xl transition-transform duration-300 group-hover:scale-110">📍</span>
                    <input
                      type="text"
                      placeholder="Bangalore"
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full text-gray-900 placeholder-gray-500 focus:outline-none focus:text-practoBlue text-lg font-medium transition-all duration-300"
                    />
                  </div>
                </div>
                <div className="flex-1 relative group">
                  <div className="flex items-center px-6 py-6">
                    <span className="text-gray-400 mr-3 text-xl transition-transform duration-300 group-hover:scale-110">🔍</span>
                    <input
                      type="text"
                      placeholder="Search doctors, clinics, hospitals, etc."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full text-gray-900 placeholder-gray-500 focus:outline-none focus:text-practoBlue text-lg font-medium transition-all duration-300"
                    />
                  </div>
                </div>
                <Link 
                  href="/doctor-listing"
                  className="bg-practoBlue hover:bg-blue-700 text-white px-8 py-6 m-1 rounded-xl font-semibold transition-all duration-300 text-lg btn-animate hover:scale-105"
                >
                  Search
                </Link>
              </div>
            </div>

            {/* Enhanced Popular Searches */}
            <div className="mt-12 animate-slide-up" style={{animationDelay: '0.8s'}}>
              <p className="text-lg mb-6 opacity-90">Popular searches:</p>
              <div className="flex flex-wrap justify-center gap-4 stagger-children">
                {popularSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchTerm(search)}
                    className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-sm hover:scale-105 hover-glow"
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
      <section className="py-16 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 stagger-children">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 text-center group border border-gray-100 hover:border-practoBlue/30 hover-lift transform hover:scale-105"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="text-5xl mb-6 group-hover:animate-bounce-gentle transition-all duration-300 transform group-hover:scale-110">{action.icon}</div>
                <h3 className="font-semibold text-gray-900 text-sm mb-3 group-hover:text-practoBlue transition-all duration-300">
                  {action.title}
                </h3>
                <p className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors duration-300">{action.subtitle}</p>
                
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-practoBlue/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Book an appointment section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 bg-practoBlue rounded-full blur-3xl animate-pulse-gentle"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-400 rounded-full blur-3xl float"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20 animate-slide-up">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Book an appointment for an in-clinic consultation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Find experienced doctors across all specialties
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 stagger-children">
            {specialties.map((specialty, index) => (
              <Link
                key={index}
                href="/doctor-listing"
                className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 group hover:border-practoBlue/40 hover-lift transform hover:scale-105 relative overflow-hidden"
                style={{animationDelay: `${index * 0.15}s`}}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-practoBlue/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-8">
                    <div className="text-5xl mr-6 group-hover:animate-bounce-gentle transition-all duration-300 transform group-hover:scale-110">{specialty.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-practoBlue transition-all duration-300">
                      {specialty.name}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">{specialty.subtitle}</p>
                  
                  {/* Arrow indicator */}
                  <div className="mt-6 flex items-center text-practoBlue opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                    <span className="text-sm font-medium mr-2">Book Now</span>
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Consult top doctors online section */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="grid grid-cols-8 gap-8 transform rotate-12 scale-150">
              {Array.from({ length: 64 }).map((_, i) => (
                <div key={i} className="w-2 h-2 bg-practoBlue rounded-full animate-pulse-gentle" style={{animationDelay: `${i * 0.1}s`}}></div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20 animate-slide-up">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 bg-gradient-to-r from-gray-900 via-practoBlue to-gray-900 bg-clip-text text-transparent">
              Consult top doctors online for any health concern
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Private online consultations with verified doctors in all specialists
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {isLoading ? (
              // Enhanced loading skeleton
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-sm p-10 animate-pulse border border-gray-100 shimmer">
                  <div className="flex items-center mb-8">
                    <div className="w-20 h-20 bg-gray-200 rounded-full mr-6 shimmer"></div>
                    <div>
                      <div className="h-5 bg-gray-200 rounded w-36 mb-3 shimmer"></div>
                      <div className="h-4 bg-gray-200 rounded w-28 mb-2 shimmer"></div>
                      <div className="h-4 bg-gray-200 rounded w-32 shimmer"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="h-8 bg-gray-200 rounded w-20 shimmer"></div>
                    <div className="h-10 bg-gray-200 rounded w-28 shimmer"></div>
                  </div>
                </div>
              ))
            ) : (
              doctors.slice(0, 6).map((doctor, index) => (
                <div 
                  key={doctor.id} 
                  className="bg-white rounded-2xl shadow-sm p-10 hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-practoBlue/30 hover-lift group transform hover:scale-105 animate-scale-in relative overflow-hidden"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-practoBlue/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center mb-8">
                      <div className="w-24 h-24 bg-gradient-to-br from-lightBlue to-practoBlue/20 rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-2xl font-bold text-practoBlue">
                          {doctor.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-practoBlue transition-colors duration-300">{doctor.name}</h3>
                        <p className="text-practoBlue font-medium mb-1">{doctor.specialty}</p>
                        <p className="text-sm text-gray-500">{5 + (index * 2)} years experience</p>
                        
                        {/* Rating */}
                        <div className="flex items-center mt-2">
                          <div className="flex text-yellow-400 mr-2">
                            {'★'.repeat(5)}
                          </div>
                          <span className="text-sm text-gray-600">4.8 • 156 reviews</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-3xl font-bold text-gray-900">₹{300 + (index * 50)}</span>
                        <span className="text-sm text-gray-500 ml-2">onwards</span>
                      </div>
                      <button className="bg-practoBlue hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 btn-animate hover:scale-105 group-hover:shadow-lg">
                        Consult Now
                      </button>
                    </div>
                    
                    {/* Availability indicator */}
                    <div className="mt-6 flex items-center text-green-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse-gentle"></div>
                      <span className="text-sm font-medium">Available Today</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="text-center mt-16 animate-slide-up" style={{animationDelay: '0.8s'}}>
            <Link 
              href="/doctor-listing"
              className="bg-practoBlue hover:bg-blue-700 text-white px-12 py-5 rounded-2xl font-semibold transition-all duration-300 text-lg btn-animate hover:scale-105 hover-glow inline-flex items-center"
            >
              View All Doctors
              <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-practoBlue text-white py-20 relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0">
            {showFloatingDots && floatingDots.map((dot, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-float"
                style={{
                  left: dot.left,
                  top: dot.top,
                  animationDelay: dot.animationDelay,
                  animationDuration: dot.animationDuration,
                }}
              ></div>
            ))}
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
            <div className="animate-slide-up">
              <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-practoBlue to-lightBlue bg-clip-text text-transparent">
                Practo
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Making healthcare accessible to everyone, everywhere.
              </p>
            </div>
            
            <div className="animate-slide-up" style={{animationDelay: '0.1s'}}>
              <h4 className="text-xl font-semibold mb-6 text-lightBlue">For patients</h4>
              <ul className="space-y-4 text-gray-400">
                {['Search for doctors', 'Search for clinics', 'Search for hospitals', 'Book health checkup'].map((item, index) => (
                  <li key={item}>
                    <a 
                      href="#" 
                      className="hover:text-white transition-all duration-300 inline-flex items-center group hover:translate-x-2"
                      style={{animationDelay: `${0.2 + (index * 0.1)}s`}}
                    >
                      <span className="w-1 h-1 bg-lightBlue rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
              <h4 className="text-xl font-semibold mb-6 text-lightBlue">For doctors</h4>
              <ul className="space-y-4 text-gray-400">
                {['Practo Profile', 'For Clinics', 'Ray by Practo', 'Practo Reach'].map((item, index) => (
                  <li key={item}>
                    <a 
                      href="#" 
                      className="hover:text-white transition-all duration-300 inline-flex items-center group hover:translate-x-2"
                      style={{animationDelay: `${0.3 + (index * 0.1)}s`}}
                    >
                      <span className="w-1 h-1 bg-lightBlue rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="animate-slide-up" style={{animationDelay: '0.3s'}}>
              <h4 className="text-xl font-semibold mb-6 text-lightBlue">More</h4>
              <ul className="space-y-4 text-gray-400">
                {['Help', 'Developers', 'Privacy Policy', 'Terms & Conditions'].map((item, index) => (
                  <li key={item}>
                    <a 
                      href="#" 
                      className="hover:text-white transition-all duration-300 inline-flex items-center group hover:translate-x-2"
                      style={{animationDelay: `${0.4 + (index * 0.1)}s`}}
                    >
                      <span className="w-1 h-1 bg-lightBlue rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="animate-slide-up" style={{animationDelay: '0.4s'}}>
              <h4 className="text-xl font-semibold mb-6 text-lightBlue">Social</h4>
              <div className="grid grid-cols-2 gap-4">
                {['Facebook', 'Twitter', 'LinkedIn', 'YouTube'].map((social, index) => (
                  <a 
                    key={social}
                    href="#" 
                    className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover-glow group animate-scale-in"
                    style={{animationDelay: `${0.5 + (index * 0.1)}s`}}
                  >
                    <span className="text-sm font-medium group-hover:text-lightBlue transition-colors duration-300">
                      {social[0]}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-16 pt-12 text-center text-gray-300 animate-slide-up" style={{animationDelay: '0.8s'}}>
            <p className="text-lg">
              &copy; 2025 Practo Clone. All rights reserved. Built with 
              <span className="text-red-400 mx-2 animate-pulse-gentle">❤️</span> 
              using Next.js & Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
