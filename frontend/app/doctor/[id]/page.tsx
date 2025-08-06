'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  location: string;
}

interface DoctorProfile extends Doctor {
  rating: number;
  experience: number;
  fees: number;
  education: string;
  about: string;
  availableSlots: string[];
}

export default function DoctorProfilePage() {
  const params = useParams();
  const doctorId = params.id;
  const [doctor, setDoctor] = useState<DoctorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState('');

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/doctors/${doctorId}`);
        const data = await response.json();
        
        // Enrich doctor data for profile
        const enrichedDoctor: DoctorProfile = {
          ...data,
          rating: 4.2 + (data.id * 0.15),
          experience: 5 + (data.id * 2),
          fees: 300 + (data.id * 50),
          education: 'MBBS, MD - ' + data.specialty,
          about: `Dr. ${data.name} is a highly experienced ${data.specialty} with over ${5 + (data.id * 2)} years of practice. Known for providing compassionate care and staying updated with the latest medical advances.`,
          availableSlots: [
            '09:00 AM', '10:00 AM', '11:00 AM', 
            '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
          ]
        };
        
        setDoctor(enrichedDoctor);
      } catch (error) {
        console.error('Error fetching doctor:', error);
      } finally {
        setLoading(false);
      }
    };

    if (doctorId) {
      fetchDoctor();
    }
  }, [doctorId]);

  const handleBooking = () => {
    if (selectedSlot && doctor) {
      alert(`Appointment booked with ${doctor.name} at ${selectedSlot}!`);
    } else {
      alert('Please select a time slot first.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Doctor not found</h2>
          <a href="/" className="text-blue-600 hover:text-blue-700">← Back to homepage</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href="/" className="text-2xl font-bold text-blue-600">Practo</a>
            </div>
            <a href="/" className="text-blue-600 hover:text-blue-700">← Back to search</a>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Doctor Info */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex items-start space-x-6">
                <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-4xl font-bold text-blue-600">
                    {doctor.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{doctor.name}</h1>
                  <p className="text-xl text-blue-600 mb-2">{doctor.specialty}</p>
                  <p className="text-gray-600 mb-2">{doctor.education}</p>
                  <p className="text-gray-600 mb-4">{doctor.experience} years experience</p>
                  
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center">
                      <span className="text-yellow-400 mr-1">⭐</span>
                      <span className="font-semibold">{doctor.rating.toFixed(1)}</span>
                      <span className="text-gray-500 ml-1">(124 reviews)</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-400 mr-1">📍</span>
                      <span className="text-gray-600">{doctor.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
              <p className="text-gray-700 leading-relaxed">{doctor.about}</p>
            </div>

            {/* Services */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Services</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-semibold text-gray-900">In-Clinic Consultation</h3>
                  <p className="text-2xl font-bold text-gray-900 mt-2">₹{doctor.fees}</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-semibold text-gray-900">Video Consultation</h3>
                  <p className="text-2xl font-bold text-gray-900 mt-2">₹{Math.round(doctor.fees * 0.8)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Book Appointment</h2>
              
              {/* Date Selection */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Select Date</h3>
                <div className="grid grid-cols-3 gap-2">
                  {['Today', 'Tomorrow', 'Wed, 8 Aug'].map((date, index) => (
                    <button
                      key={index}
                      className={`p-2 text-sm rounded border ${
                        index === 0 
                          ? 'bg-blue-600 text-white border-blue-600' 
                          : 'border-gray-300 text-gray-700 hover:border-blue-600'
                      }`}
                    >
                      {date}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Available Slots</h3>
                <div className="grid grid-cols-2 gap-2">
                  {doctor.availableSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-2 text-sm rounded border ${
                        selectedSlot === slot
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'border-gray-300 text-gray-700 hover:border-blue-600'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Booking Buttons */}
              <div className="space-y-3">
                <button 
                  onClick={handleBooking}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Book In-Clinic Visit (₹{doctor.fees})
                </button>
                <button 
                  onClick={handleBooking}
                  className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 py-3 rounded-lg font-semibold transition-colors"
                >
                  Book Video Consult (₹{Math.round(doctor.fees * 0.8)})
                </button>
              </div>

              {/* Contact Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Clinic Address</h3>
                <p className="text-sm text-gray-600">
                  Medical Center, {doctor.location}<br />
                  📞 +91 98765 43210<br />
                  🕒 Mon-Sat: 9:00 AM - 6:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
