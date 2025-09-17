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

const GOOGLE_LOGO = 'https://www.gstatic.com/images/branding/googlelogo/2x/googlelogo_light_color_92x30dp.png';

function suppressGoogleBanner() {
  const interval = setInterval(() => {
    const banner = document.querySelector('iframe.goog-te-banner-frame') as HTMLIFrameElement | null;
    if (banner && banner.style) {
      banner.style.display = 'none';
      document.body.style.top = '0px';
      clearInterval(interval);
    }
  }, 500);
}

const LastSection: React.FC = () => {
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    suppressGoogleBanner();
  }, []);

  const triggerTranslation = (lang: string, retries = 0) => {
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
    if (select) {
      select.value = lang;
      select.dispatchEvent(new Event('change', { bubbles: true }));
      suppressGoogleBanner();
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
      {/* Centered Heading & FAQ Link */}
      <div className="flex flex-col items-center justify-center mt-24 mb-32">
        <h2 className="text-5xl md:text-6xl font-bold mb-8 text-black dark:text-white text-center transition-colors duration-300">
          More questions?
        </h2>
        <Link
          to="/faq"
          className="text-xl text-[#1967d2] dark:text-blue-400 font-medium underline hover:text-blue-700 dark:hover:text-blue-300 mb-16 transition-colors duration-300"
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

      {/* Bottom Right: Privacy, Language, Theme Toggle, Google Logo */}
      <div className="absolute right-8 bottom-8 flex items-center gap-4">
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 dark:text-gray-400 underline text-lg hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300"
        >
          Privacy & Terms
        </a>
        {/* Custom Language Dropdown */}
        <select
          ref={selectRef}
          className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300"
          defaultValue="en"
          onChange={handleLanguageChange}
          aria-label="Select language"
          style={{ minWidth: '110px' }}
        >
          {LANGUAGES.map(lang => (
            <option key={lang.code} value={lang.code} className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              {lang.name}
            </option>
          ))}
        </select>
        {/* Theme Toggle */}
        <ThemeToggle />
      </div>

      {/* Google Translate widget container (hidden dropdown) */}
      <div id="google_translate_element" style={{ position: 'absolute', left: '-9999px', top: '-9999px' }} />
    </section>
  );
};

export default LastSection;
