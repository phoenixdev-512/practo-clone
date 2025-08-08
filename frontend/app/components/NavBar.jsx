import Link from 'next/link';

export default function NavBar() {
  return (
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              <div className="relative group">
                <button className="text-gray-700 hover:text-practoBlue font-medium flex items-center transition-all duration-300 hover:scale-105">
                  For Providers
                  <svg className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
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
  );
}