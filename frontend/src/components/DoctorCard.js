// components/DoctorCard.js

import React from "react";

const DoctorCard = ({ doctor }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 flex items-start gap-5 hover:shadow-lg transition duration-300">
      {/* Left: Doctor Image */}
      <div className="w-24 h-24 overflow-hidden rounded-full border">
        <img
          src={doctor.image || "/doctor-placeholder.jpg"}
          alt={doctor.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right: Doctor Info */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{doctor.name}</h3>
        <p className="text-sm text-gray-500 mb-1">{doctor.specialty}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 text-yellow-500 text-sm mb-1">
          <span>★ {doctor.rating || "4.5"}</span>
          <span className="text-gray-400">({doctor.reviews || "120"})</span>
        </div>

        {/* Location */}
        <p className="text-sm text-gray-600 mb-2">{doctor.location}</p>

        {/* CTA */}
        <button className="mt-2 px-4 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition">
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
