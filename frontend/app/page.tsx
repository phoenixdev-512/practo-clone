// app/page.tsx
import React from 'react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
          Welcome to Practo Clone
        </h1>
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-gray-700 text-center mb-8">
            Find and book appointments with the best doctors near you.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Search Doctors
              </h2>
              <p className="text-gray-600 mb-4">
                Browse our extensive network of qualified healthcare professionals.
              </p>
              <a 
                href="/doctor-listing" 
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors inline-block"
              >
                View All Doctors
              </a>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Book Appointment
              </h2>
              <p className="text-gray-600 mb-4">
                Schedule your visit with just a few clicks.
              </p>
              <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
