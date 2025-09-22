import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'te', name: 'Telugu' },
  { code: 'ta', name: 'Tamil' },
  { code: 'kn', name: 'Kannada' },
  { code: 'ml', name: 'Malayalam' },
  { code: 'gu', name: 'Gujarati' },
  { code: 'pa', name: 'Punjabi' },
  { code: 'bn', name: 'Bengali' },
  { code: 'mr', name: 'Marathi' },
  { code: 'or', name: 'Odia' },
  { code: 'ur', name: 'Urdu' }
];


// Forcefully remove Google Translate banner iframe from DOM
function removeGoogleBanner() {
  const banner = document.querySelector('iframe.goog-te-banner-frame');
  if (banner && banner.parentNode) {
    banner.parentNode.removeChild(banner);
  }
  document.body.style.top = '0px';
}

const LastSection: React.FC = () => {
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const interval = setInterval(removeGoogleBanner, 500);
    return () => clearInterval(interval);
  }, []);

  const triggerTranslation = (lang: string, retries = 0) => {
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
    if (select) {
      select.value = lang;
      select.dispatchEvent(new Event('change', { bubbles: true }));
      // Banner removal is handled by useEffect
    } else if (retries < 10) {
      setTimeout(() => triggerTranslation(lang, retries + 1), 300);
    }
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    triggerTranslation(e.target.value);
  };

  return (
    <section
      className="relative w-full min-h-screen bg-[#fafbfc] dark:bg-[#192233] flex flex-col justify-center items-center transition-all duration-500 ease-in-out"
      style={{ fontFamily: 'BoingSemiBold, Helvetica, Arial, sans-serif', marginTop: 0, marginBottom: 0 }}
    >
      {/* Centered Heading, Sample FAQs & FAQ Link */}
      <div className="flex flex-col items-center justify-center mt-24 mb-32 w-full max-w-2xl">
        <h2 className="text-5xl md:text-6xl font-bold mb-8 text-green-900 dark:text-green-400 text-center transition-colors duration-300">
          More questions?
        </h2>
        {/* Sample FAQ questions */}
        <div className="w-full mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-4">
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-400 mb-2">What is this project?</h3>
            <p className="text-gray-700 dark:text-gray-300">This is an AI-powered system that identifies Indian bovines by type (cattle or buffalo) and breed using deep learning models.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-4">
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-400 mb-2">How is the dataset prepared?</h3>
            <p className="text-gray-700 dark:text-gray-300">Images are collected breed-wise and organized into folders, with careful cleaning to remove duplicates or unclear photos.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-4">
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-400 mb-2">Which CNN architectures are used?</h3>
            <p className="text-gray-700 dark:text-gray-300">ResNet50, InceptionV3, and EfficientNet are commonly used as base models for transfer learning.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-4">
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-400 mb-2">How is the model saved?</h3>
            <p className="text-gray-700 dark:text-gray-300">The model is saved in HDF5 or ONNX format for easy reuse.</p>
          </div>
        </div>
        <Link
          to="/faq"
          className="text-xl text-green-900 dark:text-gray-300 underline hover:text-green-900 dark:hover:text-green-400 mb-16 transition-colors duration-300"
        >
          Check our FAQ.
        </Link>
      </div>

      {/* Bottom Left: AI Experiment */}
      <div
        className="absolute left-8 bottom-8 text-gray-400 dark:text-gray-500 text-lg select-none transition-colors duration-300"
        style={{ lineHeight: '1.2' }}
      >
        <div>This is an</div>
        <div className="text-3xl font-bold text-gray-500 dark:text-gray-400 transition-colors duration-300">Breed</div>
        <div>Identifier</div>
      </div>

      {/* Bottom Right: Privacy, Language, Theme Toggle */}
      <div className="absolute right-8 bottom-8 flex items-center gap-4">
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 dark:text-gray-400 underline text-lg hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300"
        >
          Privacy & Terms
        </a>

        {/* Language dropdown removed, now only in navbar */}

        {/* Theme Toggle */}
        <ThemeToggle />
      </div>

      {/* Google Translate widget container (hidden) */}
      <div id="google_translate_element" style={{ position: 'absolute', left: '-9999px', top: '-9999px' }} />
    </section>
  );
};

export default LastSection;
