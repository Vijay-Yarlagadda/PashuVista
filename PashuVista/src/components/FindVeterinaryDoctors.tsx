import React, { useState } from 'react';

const locations = [
  {
    name: 'Hyderabad',
    doctors: [
      {
        name: 'Dr. Suresh Kumar',
        phone: '9876543210',
        address: '123, Main Road, Kukatpally, Hyderabad',
        image: '/images/male-avatar.webp'
      },
      {
        name: 'Dr. Anita Rao',
        phone: '9123456780',
        address: '45, Banjara Hills, Hyderabad',
        image: '/images/female-avatar.jpg'
      },
      {
        name: 'Dr. Rajeev Menon',
        phone: '9012345678',
        address: '201, Jubilee Hills, Hyderabad',
        image: '/images/male-avatar.webp'
      },
      {
        name: 'Dr. Kavya Sharma',
        phone: '9000000001',
        address: '78, Ameerpet, Hyderabad',
        image: '/images/female-avatar.jpg'
      },
      {
        name: 'Dr. Prakash Reddy',
        phone: '9000000002',
        address: '56, Secunderabad, Hyderabad',
        image: '/images/male-avatar.webp'
      },
      {
        name: 'Dr. Meena Joshi',
        phone: '9000000003',
        address: '34, Begumpet, Hyderabad',
        image: '/images/female-avatar.jpg'
      }
    ]
  },
  {
    name: 'Vijayawada',
    doctors: [
      {
        name: 'Dr. Ramesh Babu',
        phone: '9988776655',
        address: '67, MG Road, Vijayawada',
        image: '/images/male-avatar.webp'
      },
      {
        name: 'Dr. Sneha Patil',
        phone: '9876501234',
        address: '22, Benz Circle, Vijayawada',
        image: '/images/female-avatar.jpg'
      },
      {
        name: 'Dr. Ajay Varma',
        phone: '9000000004',
        address: '11, Labbipet, Vijayawada',
        image: '/images/male-avatar.webp'
      },
      {
        name: 'Dr. Sunita Rao',
        phone: '9000000005',
        address: '99, Governorpet, Vijayawada',
        image: '/images/female-avatar.jpg'
      },
      {
        name: 'Dr. Kiran Kumar',
        phone: '9000000006',
        address: '88, Patamata, Vijayawada',
        image: '/images/male-avatar.webp'
      },
      {
        name: 'Dr. Ritu Sharma',
        phone: '9000000007',
        address: '77, Bhavanipuram, Vijayawada',
        image: '/images/female-avatar.jpg'
      }
    ]
  },
  {
    name: 'Warangal',
    doctors: [
      {
        name: 'Dr. Priya Singh',
        phone: '9001122334',
        address: '12, Hanamkonda, Warangal',
        image: '/images/female-avatar.jpg'
      },
      {
        name: 'Dr. Manoj Reddy',
        phone: '9090909090',
        address: '88, Kazipet, Warangal',
        image: '/images/male-avatar.webp'
      },
      {
        name: 'Dr. Swathi Rao',
        phone: '9000000008',
        address: '23, Subedari, Warangal',
        image: '/images/female-avatar.jpg'
      },
      {
        name: 'Dr. Arvind Kumar',
        phone: '9000000009',
        address: '44, Nakkalagutta, Warangal',
        image: '/images/male-avatar.webp'
      },
      {
        name: 'Dr. Deepa Rani',
        phone: '9000000010',
        address: '55, LB Nagar, Warangal',
        image: '/images/female-avatar.jpg'
      },
      {
        name: 'Dr. Sandeep Goud',
        phone: '9000000011',
        address: '66, Fort Road, Warangal',
        image: '/images/male-avatar.webp'
      }
    ]
  },
  {
    name: 'Guntur',
    doctors: [
      {
        name: 'Dr. Lakshmi Narayana',
        phone: '9123123123',
        address: '101, Brodipet, Guntur',
        image: '/images/male-avatar.webp'
      },
      {
        name: 'Dr. Ramesh Chandra',
        phone: '9000000012',
        address: '202, Arundelpet, Guntur',
        image: '/images/male-avatar.webp'
      },
      {
        name: 'Dr. Sushma Devi',
        phone: '9000000013',
        address: '303, Lakshmipuram, Guntur',
        image: '/images/female-avatar.jpg'
      },
      {
        name: 'Dr. Praveen Kumar',
        phone: '9000000014',
        address: '404, Brindavan Gardens, Guntur',
        image: '/images/male-avatar.webp'
      },
      {
        name: 'Dr. Neha Reddy',
        phone: '9000000015',
        address: '505, Pattabhipuram, Guntur',
        image: '/images/female-avatar.jpg'
      },
      {
        name: 'Dr. Ajay Singh',
        phone: '9000000016',
        address: '606, Nallapadu, Guntur',
        image: '/images/male-avatar.webp'
      }
    ]
  },
  {
    name: 'Karimnagar',
    doctors: [
      {
        name: 'Dr. Shilpa Rao',
        phone: '9345678901',
        address: '55, Mancherial Road, Karimnagar',
        image: '/images/female-avatar.jpg'
      },
      {
        name: 'Dr. Mahesh Gupta',
        phone: '9000000017',
        address: '77, Ramnagar, Karimnagar',
        image: '/images/male-avatar.webp'
      },
      {
        name: 'Dr. Pooja Jain',
        phone: '9000000018',
        address: '88, Mankammathota, Karimnagar',
        image: '/images/female-avatar.jpg'
      },
      {
        name: 'Dr. Vinay Kumar',
        phone: '9000000019',
        address: '99, Kothirampur, Karimnagar',
        image: '/images/male-avatar.webp'
      },
      {
        name: 'Dr. Anjali Mehta',
        phone: '9000000020',
        address: '111, Saraswathinagar, Karimnagar',
        image: '/images/female-avatar.jpg'
      },
      {
        name: 'Dr. Rakesh Yadav',
        phone: '9000000021',
        address: '222, Vavilalapally, Karimnagar',
        image: '/images/male-avatar.webp'
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
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {doctors.map((doc, idx) => (
              <li key={idx} className="bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-gray-900/20 p-4 flex flex-col items-center transition-all duration-300">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-20 h-20 rounded-full object-cover mb-3 border-2 border-blue-200 dark:border-blue-900 shadow"
                />
                <div className="text-lg font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-300 text-center" style={{ fontFamily: 'Space Grotesk, Arial, sans-serif' }}>{doc.name}</div>
                <div className="text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-300 text-center">Phone: <span className="font-medium">{doc.phone}</span></div>
                <div className="text-gray-600 dark:text-gray-400 text-sm transition-colors duration-300 text-center">{doc.address}</div>
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