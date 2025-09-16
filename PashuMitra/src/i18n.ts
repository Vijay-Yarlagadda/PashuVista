import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Add translations for each language here
const resources = {
  en: {
    translation: {
      "More questions?": "More questions?",
      "Check our FAQ.": "Check our FAQ.",
      "Privacy & Terms": "Privacy & Terms",
      "This is an": "This is an",
      "Experiment": "Experiment"
    }
  },
  hi: {
    translation: {
      "More questions?": "अधिक प्रश्न?",
      "Check our FAQ.": "हमारे FAQ देखें।",
      "Privacy & Terms": "गोपनीयता और शर्तें",
      "This is an": "यह एक",
      "Experiment": "प्रयोग"
    }
  },
  te: {
    translation: {
      "More questions?": "మరిన్ని ప్రశ్నలు?",
      "Check our FAQ.": "మా FAQ చూడండి.",
      "Privacy & Terms": "గోప్యత & నిబంధనలు",
      "This is an": "ఇది ఒక",
      "Experiment": "ప్రయోగం"
    }
  },
  // Add more languages as needed
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
