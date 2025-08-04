import SearchBar from './SearchBar';

export default function HeroSection() {
    return (
        <div className="bg-blue-50 py-10 sm:py-16 px-4 sm:px-8 md:px-16 lg:px-32">
            <div className="max-w-7xl mx-auto text-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                    Find the best doctors near you
                </h1>
                <p className="mt-4 text-gray-600 text-base sm:text-lg">
                    Book appointments with top doctors, clinics, and hospitals.
                </p>
                <div className="mt-8">
                    <SearchBar />
                </div>
            </div>
        </div>
    );
}
