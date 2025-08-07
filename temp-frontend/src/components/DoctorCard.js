import React from 'react';
import { MapPin, Stethoscope, BadgeCheck, IndianRupee } from 'lucide-react';

const DoctorCard = ({ name, specialty, location, experience, fee }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-800">{name}</h3>

      <div className="mt-3 flex flex-col gap-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Stethoscope size={18} />
          <span>{specialty}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={18} />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2">
          <BadgeCheck size={18} />
          <span>{experience} years experience</span>
        </div>
        <div className="flex items-center gap-2">
          <IndianRupee size={18} />
          <span>{fee} consultation fee</span>
        </div>
      </div>

      <div className="mt-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg">
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
