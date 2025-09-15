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

const FindVeterinaryDoctors: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState(locations[0].name);
  const doctors = locations.find(loc => loc.name === selectedLocation)?.doctors || [];

  return (
  <section className="w-full max-w-3xl mx-auto mt-27 mb-16 px-4">
      <h2
        className="text-6xl mb-10"
        style={{ fontFamily: 'Boing SemiBold, Space Grotesk, Arial, sans-serif', color: '#000', fontWeight: 600 }}
      >
        Find Veterinary Doctors
      </h2>
      <div className="mb-6">
        <label htmlFor="location" className="block mb-2 font-medium text-gray-700">Select Location:</label>
        <select
          id="location"
          value={selectedLocation}
          onChange={e => setSelectedLocation(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          style={{ fontFamily: 'Space Grotesk, Arial, sans-serif', fontWeight: 500 }}
        >
          {locations.map(loc => (
            <option key={loc.name} value={loc.name}>{loc.name}</option>
          ))}
        </select>
      </div>
      <div>
        {doctors.length === 0 ? (
          <div className="text-gray-500">No doctors found for this location.</div>
        ) : (
          <ul className="space-y-6">
            {doctors.map((doc, idx) => (
              <li key={idx} className="bg-white rounded-lg shadow p-4">
                <div className="text-lg font-semibold" style={{ fontFamily: 'Space Grotesk, Arial, sans-serif', color: '#000' }}>{doc.name}</div>
                <div className="text-gray-700 mb-1">Phone: <span className="font-medium">{doc.phone}</span></div>
                <div className="text-gray-600 text-sm">{doc.address}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default FindVeterinaryDoctors;
