import React, { useState, useEffect } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import FindVeterinaryDoctors from './FindVeterinaryDoctors';
import LastSection from './LastSection';

const LandingPage: React.FC = () => {
  // Use images from public/images folder
  const imageFiles = [
    'WhatsApp Image 2025-09-17 at 09.24.11_9ec584f8_gir.jpg',
    'WhatsApp Image 2025-09-17 at 09.24.11_9ec584f8_hallilar.jpg',
    'WhatsApp Image 2025-09-17 at 09.24.11_9ec584f8_holsteinfreistan.jpg',
    'WhatsApp Image 2025-09-17 at 09.24.11_8f24a0b7_jersey.jpg',
  ];
  // Extract breed name from filename
  function getBreedName(filename: string): string {
    if (filename.toLowerCase().includes('gir')) return 'Gir';
    if (filename.toLowerCase().includes('hallilar')) return 'Hallikar';
    if (filename.toLowerCase().includes('holsteinfreistan')) return 'Holstein Friesian';
    if (filename.toLowerCase().includes('jersey')) return 'Jersey';
    return 'Unknown';
  }
  const carouselImages = imageFiles.map(f => ({ src: `/images/${f}`, breed: getBreedName(f) }));

  const [carouselIdx, setCarouselIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIdx(idx => (idx + 1) % carouselImages.length);
    }, 3000); // Change every 3 seconds
    return () => clearInterval(timer);
  }, []);
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

  // ...existing code...
  // Import LastSection
  // ...existing code...
  return (
    <>
      <div className="min-h-screen bg-[#fafbfc] dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col transition-all duration-500 ease-in-out">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        {/* Navbar */}
        {/* ...existing code... */}
        <nav
          className={`
            fixed top-0 left-0 w-full z-20 flex items-center justify-between px-4 py-4 md:px-12 transition-all duration-300
            ${scrolled
              ? 'bg-white dark:bg-gray-800 rounded-b-2xl shadow-md dark:shadow-gray-900/20'
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
                <Bars3Icon className="h-7 w-7 text-black dark:text-white transition-all" />
              </button>
            ) : (
              <span className="text-3xl font-semibold text-blue-600 dark:text-blue-400 transition-all">PashuVista</span>
            )}
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium underline text-lg md:text-xl transition-colors duration-300" onClick={e => {
              e.preventDefault();
              const el = document.getElementById('about');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}>About</a>
            <Link to="/faq#FAQSection" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium text-lg md:text-xl transition-colors duration-300">FAQ</Link>
            <Link
              to="/get-started"
              className="bg-blue-600 dark:bg-blue-500 text-white px-5 py-2 rounded-lg font-bold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300"
            >
              Get Started
            </Link>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 flex flex-col md:flex-row items-center justify-center px-4 py-8 md:py-0 md:px-16 mt-20">
          {/* Left Side */}
          <div className="w-full md:w-1/2 flex flex-col items-start md:pr-12 mt-48">
            <h1
              className="text-5xl md:text-9xl font-bold text-blue-600 dark:text-blue-400 mb-4 leading-tight transition-colors duration-300"
              style={{ fontFamily: 'BoingSemiBold, Helvetica, Arial, sans-serif' }}
            >
              <span className="block md:inline">Pashu</span>
              <span className="block md:inline">Vista</span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-gray-700 dark:text-gray-200 mb-4 font-bold transition-colors duration-300">
              Identify cattle breeds instantly using just an image.
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl md:max-w-2xl transition-colors duration-300">
              Train and use AI models to recognize different cattle breeds with ease. Farmers, vets, and researchers can get reliable breed identification without technical knowledge. Upload a photo and let PashuVista do the rest — fast, accurate, and farmer-friendly.
            </p>
            <Link
              to="/get-started"
              className="bg-blue-600 dark:bg-blue-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300 mb-6 md:mb-0"
            >
              Get Started
            </Link>
          </div>
          {/* Right Side: Carousel (smaller) */}
          <div className="w-full md:w-1/2 flex flex-col items-center mt-4 md:mt-0">
            <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[400px] aspect-[4/3] flex items-center justify-center bg-gray-100 dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden transition-all duration-300">
              <img
                src={carouselImages[carouselIdx].src}
                alt={carouselImages[carouselIdx].breed}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/20 mt-5 px-5 py-3 w-full max-w-[280px] sm:max-w-[320px] md:max-w-[400px] flex flex-col items-center transition-all duration-300">
              <span className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 transition-colors duration-300">Breed</span>
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full font-bold text-lg transition-colors duration-300">
                {carouselImages[carouselIdx].breed}
              </span>
            </div>
          </div>
        </main>
        {/* Find Veterinary Doctors Section below landing page */}
        <div className="mt-24">
          <FindVeterinaryDoctors />
          <LastSection />
        </div>
      </div>
    </>
  );
};

export default LandingPage;