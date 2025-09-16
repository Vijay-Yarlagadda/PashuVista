import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import FAQPage from './components/FAQPage';
import GetStartedPage from './components/GetStartedPage';
import FindVeterinaryDoctors from './components/FindVeterinaryDoctors';
import LastSection from './components/LastSection';

function App() {
  return (
    <Router>
      <div className="relative min-h-screen pb-0 flex flex-col">
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/get-started" element={<GetStartedPage />} />
            <Route path="/find-veterinary-doctors" element={<FindVeterinaryDoctors />} />
          </Routes>
        </div>
        <LastSection />
      </div>
    </Router>
  );
}

export default App;