import React from "react";

const specialties = [
  { name: "Dentist", icon: "🦷" },
  { name: "Gynecologist", icon: "👩‍⚕️" },
  { name: "Dermatologist", icon: "💊" },
  { name: "Psychiatrist", icon: "🧠" },
  { name: "General Physician", icon: "🩺" },
  { name: "Pediatrician", icon: "👶" },
];



export default function Hero() {
  return (
    <section className="py-12 bg-gray-50 text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Find the right doctor near you
      </h1>
      <p className="text-gray-600 mb-8">
        Book appointments with trusted healthcare providers
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 max-w-5xl mx-auto">
        {specialties.map((s, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-4 bg-white rounded-lg shadow hover:shadow-md cursor-pointer transition"
          >
            <div className="text-4xl">{s.icon}</div>
            <div className="mt-2 text-sm font-medium text-gray-700">{s.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
