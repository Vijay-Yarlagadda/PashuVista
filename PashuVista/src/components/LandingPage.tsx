import React, { useState, useEffect } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import FindVeterinaryDoctors from './FindVeterinaryDoctors';

const LandingPage: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Handle scroll to toggle navbar style
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {/* Navbar */}
      <nav
        className={`
          fixed top-0 left-0 w-full z-20 flex items-center justify-between px-4 py-4 md:px-12 transition-all duration-300
          ${scrolled
            ? 'bg-white rounded-b-2xl shadow-md'
            : 'bg-transparent rounded-none shadow-none'
          }
        `}
        style={{
          backdropFilter: scrolled ? 'blur(8px)' : 'none',
        }}
      >
        <div className="flex items-center">
          {!scrolled ? (
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setSidebarOpen(true)}
              className="p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent"
              style={{ background: 'none', border: 'none' }}
            >
              <Bars3Icon className="h-7 w-7 text-black transition-all" />
            </button>
          ) : (
            <span className="text-3xl font-semibold text-blue-600 transition-all">PashuVista</span>
          )}
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium underline text-lg md:text-xl" onClick={e => {
            e.preventDefault();
            const el = document.getElementById('about');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}>About</a>
          <Link to="/faq#FAQSection" className="text-gray-700 hover:text-blue-600 font-medium text-lg md:text-xl">FAQ</Link>
          <Link
            to="/get-started"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg font-bold hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col md:flex-row items-center justify-center px-4 py-8 md:py-0 md:px-16 mt-20">
  {/* Left Side */}
  <div className="w-full md:w-1/2 flex flex-col items-start md:pr-12 mt-48">
          <h1 className="text-8xl md:text-9xl font-semibold text-blue-600 mb-4 leading-tight">PashuVista</h1>
          <h2 className="text-2xl md:text-3xl text-gray-700 mb-4 font-bold">
            Identify cattle breeds instantly using just an image.
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl md:max-w-2xl">
            Train and use AI models to recognize different cattle breeds with ease. Farmers, vets, and researchers can get reliable breed identification without technical knowledge. Upload a photo and let PashuVista do the rest — fast, accurate, and farmer-friendly.
          </p>
          <Link
            to="/get-started"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition mb-6 md:mb-0"
          >
            Get Started
          </Link>
        </div>
        {/* Right Side */}
        <div className="w-full md:w-1/2 flex flex-col items-center mt-8 md:mt-0">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=80"
            alt="Cattle"
            className="rounded-xl shadow-lg w-full max-w-xs md:max-w-sm"
          />
          <div className="bg-white rounded-lg shadow-md mt-6 px-6 py-4 w-full max-w-xs md:max-w-sm flex flex-col items-center">
            <span className="text-lg font-semibold text-gray-800 mb-2">Result</span>
            <div className="flex w-full justify-between">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">Breed A</span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">Not Breed A</span>
            </div>
          </div>
        </div>
      </main>
        {/* Find Veterinary Doctors Section below landing page */}
        <div className="mt-24 mb-16">
          <FindVeterinaryDoctors />
        </div>
    </div>
  );
};

export default LandingPage;