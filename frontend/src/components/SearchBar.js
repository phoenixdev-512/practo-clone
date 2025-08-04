import { useState } from "react";
import { useRouter } from "next/router";

export default function SearchBar() {
    const [location, setLocation] = useState('');
    const [specialy, setSpeciality] = useState('');
    const router = useRouter();

    const handleSearch = (e) => {
        e.preventDefault();
        router.push('/search?location=${location}&specialty=${specialty}');
    };

    return (
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 p-4">
            <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border p-2 rounded w-full sm:w-1/2"
            />
            <input
                type="text"
                placeholder="Specialty"
                value={specialty}
                onChange={(e) => setSpeciality(e.target.value)}
                className="border p-2 rounded w-full sm:w-1/2"
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Search
            </button>
        </form>
    )
}