import React, { useState } from "react";

const popularSearches = ['Dermatologist', 'ENT', 'Cardiologist', 'Dentist', 'Pediatrician', 'Gynecologist'];

export default function Hero() {
  const [location, setLocation] = useState('');
  const [search, setSearch] = useState('');

  return (
    <section className="bg-gradient-to-r from-practoBlue to-blue-600 text-white py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Your home</h1>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">for health</h2>
        <p className="text-xl font-medium mb-10">Find and Book</p>

        {/* Search Section */}
        <div className="bg-white rounded-xl shadow-2xl p-2 max-w-4xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row gap-2">
            <div className="flex-1 relative">
              <div className="flex items-center px-4 py-4 border-r md:border-r-gray-200">
                <span className="text-gray-400 mr-3 text-xl">📍</span>
                <input
                  type="text"
                  placeholder="Bangalore"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full text-gray-800 placeholder-gray-500 focus:outline-none text-lg font-medium"
                />
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="flex items-center px-4 py-4">
                <span className="text-gray-400 mr-3 text-xl">🔍</span>
                <input
                  type="text"
                  placeholder="Search doctors, clinics, hospitals, etc."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full text-gray-800 placeholder-gray-500 focus:outline-none text-lg font-medium"
                />
              </div>
            </div>
            <button className="bg-practoBlue hover:bg-blue-700 text-white px-8 py-4 m-1 rounded-lg font-semibold transition-colors text-lg">
              Search
            </button>
          </div>
        </div>

        {/* Popular Searches */}
        <div className="mt-8">
          <p className="text-lg mb-4 opacity-90">Popular searches:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {popularSearches.map((tag, index) => (
              <button
                key={index}
                onClick={() => setSearch(tag)}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-full text-sm font-medium transition-all backdrop-blur-sm"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
