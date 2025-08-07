// components/NavBar.jsx
export default function NavBar() {
  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-practoBlue font-bold text-2xl">practo</div>
        
        <ul className="hidden md:flex gap-8 text-sm text-gray-700 font-medium">
          <li className="hover:text-practoBlue cursor-pointer transition-colors">Find Doctors</li>
          <li className="hover:text-practoBlue cursor-pointer transition-colors">Video Consult</li>
          <li className="hover:text-practoBlue cursor-pointer transition-colors">Surgeries</li>
          <li className="hover:text-practoBlue cursor-pointer transition-colors">For Corporates</li>
        </ul>
        
        <div className="flex items-center space-x-4">
          <button className="text-practoBlue font-medium text-sm hover:text-blue-700 transition-colors">
            Login
          </button>
          <button className="bg-practoBlue text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors font-medium">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
}
