import React, { useState } from 'react';

const locations = [
  {
    name: 'Hyderabad',
    doctors: [
      {
        name: 'Dr. Suresh Kumar',
        phone: '9876543210',
        address: '123, Main Road, Kukatpally, Hyderabad'
      },
      {
        name: 'Dr. Anita Rao',
        phone: '9123456780',
        address: '45, Banjara Hills, Hyderabad'
      }
    ]
  },
  {
    name: 'Vijayawada',
    doctors: [
      {
        name: 'Dr. Ramesh Babu',
        phone: '9988776655',
        address: '67, MG Road, Vijayawada'
      }
    ]
  },
  {
    name: 'Warangal',
    doctors: [
      {
        name: 'Dr. Priya Singh',
        phone: '9001122334',
        address: '12, Hanamkonda, Warangal'
      }
    ]
  }
];

interface FindVeterinaryDoctorsProps {
  standalone?: boolean;
}

const FindVeterinaryDoctors: React.FC<FindVeterinaryDoctorsProps> = ({ standalone = false }) => {
  const [selectedLocation, setSelectedLocation] = useState(locations[0].name);
  const doctors = locations.find(loc => loc.name === selectedLocation)?.doctors || [];

  const content = (
    <section className="w-full max-w-3xl mx-auto mt-27 mb-16 px-4">
      <h2
        className="text-3xl md:text-6xl mb-10 font-bold text-black dark:text-white transition-colors duration-300"
        style={{ fontFamily: 'BoingSemiBold, Helvetica, Arial, sans-serif', fontWeight: 700 }}
      >
        Find Veterinary Doctors
      </h2>
      <div className="mb-6">
        <label htmlFor="location" className="block mb-2 font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">Select Location:</label>
        <select
          id="location"
          value={selectedLocation}
          onChange={e => setSelectedLocation(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-all duration-300"
          style={{ fontFamily: 'Space Grotesk, Arial, sans-serif', fontWeight: 500 }}
        >
          {locations.map(loc => (
            <option key={loc.name} value={loc.name}>{loc.name}</option>
          ))}
        </select>
      </div>
      <div>
        {doctors.length === 0 ? (
          <div className="text-gray-500 dark:text-gray-400 transition-colors duration-300">No doctors found for this location.</div>
        ) : (
          <ul className="space-y-6">
            {doctors.map((doc, idx) => (
              <li key={idx} className="bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-gray-900/20 p-4 transition-all duration-300">
                <div className="text-lg font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-300" style={{ fontFamily: 'Space Grotesk, Arial, sans-serif' }}>{doc.name}</div>
                <div className="text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-300">Phone: <span className="font-medium">{doc.phone}</span></div>
                <div className="text-gray-600 dark:text-gray-400 text-sm transition-colors duration-300">{doc.address}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );

  if (standalone) {
    return (
      <div className="min-h-screen bg-[#fafbfc] dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col transition-all duration-500 ease-in-out">
        {content}
      </div>
    );
  }

  return content;
};

export default FindVeterinaryDoctors;