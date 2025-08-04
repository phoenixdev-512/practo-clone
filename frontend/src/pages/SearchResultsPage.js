// pages/SearchResultsPage.js

import React from "react";
import DoctorCard from "@/components/DoctorCard";

const doctors = [
  {
    name: "Dr. Ayesha Sharma",
    specialty: "Dermatologist",
    rating: 4.7,
    reviews: 142,
    location: "Whitefield, Bangalore",
    image: "/doctor1.jpg",
  },
  {
    name: "Dr. Rahul Mehta",
    specialty: "Orthopedic Surgeon",
    rating: 4.5,
    reviews: 98,
    location: "Koramangala, Bangalore",
    image: "/doctor2.jpg",
  },
  {
    name: "Dr. Neha Patel",
    specialty: "Pediatrician",
    rating: 4.8,
    reviews: 205,
    location: "Indiranagar, Bangalore",
    image: "/doctor3.jpg",
  },
];

const SearchResultsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Search Results
      </h2>

      <div className="grid gap-6">
        {doctors.map((doctor, index) => (
          <DoctorCard key={index} doctor={doctor} />
        ))}
      </div>
    </div>
  );
};

export default SearchResultsPage;
