export default function DoctorCard({ doctor }) {
    return (
        <div className="bg-white rounded-xl shadow-md p-5 mb-4 flex flex-col sm:flex-row items-start sm:items-center">
            <img
                src={doctor.image || "/default-doctor.jpg"}
                alt={doctor.name}
                className="w-24 h-24 rounded-full object-cover mr-6 mb-4 sm:mb-0"
            />
            <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{doctor.name}</h3>
                <p className="text-sm text-gray-600">{doctor.qualification}</p>
                <p className="text-sm text-gray-600">{doctor.specialty} • {doctor.experience} years experience</p>
                <p className="text-sm text-gray-600">{doctor.location}</p>
            </div>
            <button className="mt-4 sm:mt-0 sm:ml-4 bg-blue-600 text-white text-sm px-5 py-2 rounded-full hover:bg-blue-700 transition-all">
                Book Appointment
            </button>
        </div>
    );
}
