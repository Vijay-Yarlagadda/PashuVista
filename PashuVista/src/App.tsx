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
    {/* LastSection removed from all pages */}
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;