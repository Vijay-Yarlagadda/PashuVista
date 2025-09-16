import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

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
  { code: 'ur', name: 'Urdu' },
];

const GOOGLE_LOGO =
  'https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_light_clr_74x24px.svg';

function suppressGoogleBanner() {
  // Remove Google Translate banner if it appears
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
    const w = window as any;
    if (!w.googleTranslateElementInit) {
      w.googleTranslateElementInit = function () {
        new w.google.translate.TranslateElement({
          pageLanguage: 'en',
          includedLanguages: LANGUAGES.map(l => l.code).join(','),
          layout: w.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        }, 'google_translate_element_visible');
      };
      const script = document.createElement('script');
      script.src =
        'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    } else if (w.google && w.google.translate) {
      w.googleTranslateElementInit();
    }
    suppressGoogleBanner();
  }, []);

  // Wait for Google Translate widget to be ready
  const triggerTranslation = (lang: string, retries = 0) => {
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
    if (select) {
      select.value = lang;
      select.dispatchEvent(new Event('change'));
      suppressGoogleBanner();
    } else if (retries < 10) {
      setTimeout(() => triggerTranslation(lang, retries + 1), 300);
    }
  };

  // Custom dropdown handler
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    triggerTranslation(lang);
  };

  return (
    <section
      className="relative w-full min-h-[40vh] bg-[#fafbfc] flex flex-col justify-center items-center"
      style={{ fontFamily: 'BoingSemiBold, Helvetica, Arial, sans-serif', marginTop: 0, marginBottom: 0 }}
    >
      {/* Centered Heading & FAQ Link */}
      <div className="flex flex-col items-center justify-center mt-24 mb-32">
        <h2 className="text-5xl md:text-6xl font-bold mb-8 text-black text-center">
          More questions?
        </h2>
        <Link
          to="/faq"
          className="text-xl text-[#1967d2] font-medium underline hover:text-blue-700 mb-16"
        >
          Check our FAQ.
        </Link>
      </div>

      {/* Bottom Left: AI Experiment */}
      <div
        className="absolute left-8 bottom-8 text-gray-400 text-lg select-none"
        style={{ lineHeight: '1.2' }}
      >
        <div>This is an</div>
        <div className="text-3xl font-bold text-gray-500">A.I.</div>
        <div>Experiment</div>
      </div>

      {/* Bottom Right: Privacy, Language, Google Logo */}
      <div className="absolute right-8 bottom-8 flex items-center gap-6">
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 underline text-lg hover:text-gray-700"
        >
          Privacy & Terms
        </a>
        {/* Language Dropdown */}
        <div className="flex items-center gap-2">
          <select
            ref={selectRef}
            className="border border-gray-300 rounded px-2 py-1 text-gray-700 bg-white text-base focus:outline-none"
            defaultValue="en"
            onChange={handleLanguageChange}
            aria-label="Select language"
            style={{ minWidth: '110px' }}
          >
            {LANGUAGES.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
          <img
            src={GOOGLE_LOGO}
            alt="Google logo"
            className="h-6 w-auto ml-2"
            draggable="false"
          />
        </div>
      </div>

      {/* Google Translate Element: visible but styled off-screen for accessibility */}
      <div
        id="google_translate_element_visible"
        style={{ position: 'fixed', bottom: 0, right: 0, zIndex: 9999, opacity: 0, pointerEvents: 'none', width: '200px', height: '40px' }}
        aria-hidden="true"
      />
    </section>
  );
};

export default LastSection;
