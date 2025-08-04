import { useState } from "react";
import { useRouter } from "next/router";

export default function SearchBar() {
    const [location, setLocation] = useState('');
    const [specialty, setSpecialty] = useState('');
    const router = useRouter();

    const handleSearch = (e) => {
        e.preventDefault();
        router.push(`/search?location=${location}&specialty=${specialty}`);
    };

    return (
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center justify-center bg-white shadow-md rounded-full px-4 py-2 max-w-3xl mx-auto mt-6">
            <input
                type="text"
                placeholder="Search location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1 border-none focus:outline-none px-4 py-2 rounded-full text-sm w-full sm:w-auto"
            />
            <div className="w-px h-6 bg-gray-300 hidden sm:block mx-2" />
            <input
                type="text"
                placeholder="Search doctors, clinics, hospitals, etc."
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="flex-1 border-none focus:outline-none px-4 py-2 rounded-full text-sm w-full sm:w-auto"
            />
            <button
                type="submit"
                className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-full hover:bg-blue-700 transition-all ml-0 sm:ml-4 mt-2 sm:mt-0 w-full sm:w-auto"
            >
                Search
            </button>
        </form>
    );
}
