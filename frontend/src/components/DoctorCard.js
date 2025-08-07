import React from 'react';

const DoctorCard = ({ name, specialty, location, experience, fee, rating = 4.5 }) => {
  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-lg transition duration-300 hover:border-practoBlue/20">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-full bg-lightBlue text-practoBlue flex items-center justify-center text-xl font-bold flex-shrink-0">
          {name ? name.split(' ').map(n => n[0]).join('').slice(0, 2) : 'DR'}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-practoBlue mb-1">{name}</h3>
          <p className="text-sm text-gray-600 mb-1">{specialty}</p>
          <div className="flex items-center text-sm text-gray-600 mb-1">
            <span className="mr-2">📍</span>
            <span>{location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 mb-1">
            <span className="mr-2">🩺</span>
            <span>{experience} years experience</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <span className="mr-2">💸</span>
            <span>₹{fee} Consultation Fee</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-yellow-500 mr-1">⭐</span>
            <span className="text-gray-600">{rating} • </span>
            <span className="text-green-600 ml-1">✅ 95% Patient Satisfaction</span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex gap-3">
        <button className="flex-1 bg-practoBlue text-white px-4 py-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          Book Appointment
        </button>
        <button className="flex-1 bg-white border border-practoBlue text-practoBlue px-4 py-3 rounded-lg text-sm font-medium hover:bg-lightBlue transition-colors">
          Video Consult
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
