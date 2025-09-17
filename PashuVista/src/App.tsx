import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import LandingPage from './components/LandingPage';
import FAQPage from './components/FAQPage';
import GetStartedPage from './components/GetStartedPage';
import FindVeterinaryDoctors from './components/FindVeterinaryDoctors';
import LastSection from './components/LastSection';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[#fafbfc] dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col transition-all duration-500 ease-in-out">
        <Router>
          <div className="relative min-h-screen pb-0 flex flex-col">
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/get-started" element={<GetStartedPage />} />
                <Route path="/find-veterinary-doctors" element={<FindVeterinaryDoctors standalone={true} />} />
              </Routes>
            </div>
          </div>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;