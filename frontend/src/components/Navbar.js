// components/Navbar.jsx
export default function Navbar() {
  return (
    <nav className="w-full px-6 py-4 shadow-md flex justify-between items-center bg-white">
      <div className="text-xl font-bold text-blue-600">PractoClone</div>

      <div className="flex-1 mx-6">
        <input
          type="text"
          placeholder="Search doctors, clinics, hospitals, etc."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>

      <div className="flex gap-4 items-center">
        <select className="border px-3 py-2 rounded-md">
          <option>Bangalore</option>
          <option>Delhi</option>
          <option>Mumbai</option>
        </select>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Login
        </button>
      </div>
    </nav>
  );
}
