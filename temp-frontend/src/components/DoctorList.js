export default function DoctorList({ doctors }) {
    if (!doctors || doctors.length === 0) {
        return <p className="p-4 text-gray-600">No doctors found.</p>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {doctors.map((doc, index) => (
                <div key={index} className="border p-4 rounded shadow hover:shadow-lg transition">
                    <h2 className="text-xl font-semibold">{doc.name}</h2>
                    <p className="text-gray-600">{doc.specialty}</p>
                    <p className="text-gray-500">{doc.location}</p>
                    <p className="text-sm mt-1">Experience: {doc.experience} years</p>
                    <p className="text-sm">Fee: ₹{doc.fee}</p>
                    <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Book Appointment
                    </button>
                </div>
            ))}
        </div>
    );
}
