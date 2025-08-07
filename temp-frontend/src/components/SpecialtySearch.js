import React, { useState, useEffect } from 'react';

const SpecialtySearch = () => {
  const [specialty, setSpecialty] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const searchBySpecialty = async (searchSpecialty) => {
    if (!searchSpecialty.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setError(null);
    setHasSearched(true);
    
    try {
      const response = await fetch(`http://localhost:5000/api/doctors/specialty/${encodeURIComponent(searchSpecialty)}`);
      if (!response.ok) {
        throw new Error('Failed to search doctors by specialty');
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
    searchBySpecialty(specialty);
  };

  const handleQuickSearch = (quickSpecialty) => {
    setSpecialty(quickSpecialty);
    searchBySpecialty(quickSpecialty);
  };

  return (
    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Search Doctors by Specialty</h3>
      
      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            placeholder="Enter specialty (e.g., Cardiologist, Dermatologist)"
            className="flex-1 border border-gray-300 rounded px-3 py-2"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      {/* Quick Search Buttons */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">Quick search:</p>
        <div className="flex gap-2 flex-wrap">
          {['Cardiologist', 'Dermatologist', 'Pediatrician'].map((quickSpecialty) => (
            <button
              key={quickSpecialty}
              onClick={() => handleQuickSearch(quickSpecialty)}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-colors"
            >
              {quickSpecialty}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-blue-600 mb-4">Searching for {specialty}...</div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-red-600 mb-4">Error: {error}</div>
      )}

      {/* Search Results */}
      {hasSearched && !loading && (
        <div>
          <h4 className="font-medium mb-2">
            Search Results for "{specialty}" ({searchResults.length} found):
          </h4>
          {searchResults.length > 0 ? (
            <div className="space-y-2">
              {searchResults.map((doctor) => (
                <div key={doctor.id} className="bg-white p-3 border border-gray-200 rounded">
                  <div className="font-medium">{doctor.name}</div>
                  <div className="text-sm text-gray-600">
                    {doctor.specialty} • {doctor.location}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 italic">
              No doctors found with specialty "{specialty}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SpecialtySearch;
