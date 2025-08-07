import React, { useState, useEffect } from 'react';

const CitySearch = () => {
  const [city, setCity] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const searchByCity = async (searchCity) => {
    if (!searchCity.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setError(null);
    setHasSearched(true);
    
    try {
      const response = await fetch(`http://localhost:5000/api/doctors/city/${encodeURIComponent(searchCity)}`);
      if (!response.ok) {
        throw new Error('Failed to search doctors by city');
      }
      const data = await response.json();
      setSearchResults(data);
    } catch (err) {
      setError(err.message);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchByCity(city);
  };

  const handleQuickSearch = (quickCity) => {
    setCity(quickCity);
    searchByCity(quickCity);
  };

  return (
    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Search Doctors by City</h3>
      
      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name (e.g., Delhi, Mumbai, Bangalore)"
            className="flex-1 border border-gray-300 rounded px-3 py-2"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      {/* Quick Search Buttons */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">Quick search:</p>
        <div className="flex gap-2 flex-wrap">
          {['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Pune'].map((quickCity) => (
            <button
              key={quickCity}
              onClick={() => handleQuickSearch(quickCity)}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-colors"
            >
              {quickCity}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-blue-600 mb-4">Searching in {city}...</div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-red-600 mb-4">Error: {error}</div>
      )}

      {/* Search Results */}
      {hasSearched && !loading && (
        <div>
          <h4 className="font-medium mb-2">
            Doctors in "{city}" ({searchResults.length} found):
          </h4>
          {searchResults.length > 0 ? (
            <div className="space-y-2">
              {searchResults.map((doctor) => (
                <div key={doctor.id} className="bg-white p-3 border border-blue-200 rounded">
                  <div className="font-medium">{doctor.name}</div>
                  <div className="text-sm text-gray-600">
                    {doctor.specialty} • {doctor.location}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 italic">
              No doctors found in "{city}"
            </div>
          )}
        </div>
      )}

      {/* TRPC-Style Usage Example */}
      <div className="mt-4 p-3 bg-blue-100 border border-blue-200 rounded text-sm">
        <h4 className="font-medium mb-1">TRPC-Style Usage:</h4>
        <code className="text-xs text-gray-600">
          trpc.doctors.getDoctorsByCity.useQuery()
        </code>
      </div>
    </div>
  );
};

export default CitySearch;
